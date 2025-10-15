/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

// Interface pour la réponse token
interface TokenResponse {
  access: string;
  refresh?: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/",
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  console.log("Initial request result:", {
    status: result.meta?.response?.status,
    error: result.error,
  });

  if (!result.error || result.error.status !== 401) {
    return result;
  }

  console.log("🔐 Token expired, attempting refresh...");

  const refreshToken = localStorage.getItem("refresh");

  if (!refreshToken) {
    console.log("❌ No refresh token available");
    localStorage.removeItem("access");
    window.location.href = "/login";
    return result;
  }

  try {
    console.log(
      "🔄 Refreshing token with:",
      refreshToken.substring(0, 20) + "..."
    );

    // Appel au endpoint de refresh
    const refreshResult = await baseQuery(
      {
        url: "token/refresh/",
        method: "POST",
        body: { refresh: refreshToken },
        headers: {
          "Content-Type": "application/json",
        },
      },
      api,
      extraOptions
    );

    console.log("📨 Refresh response:", refreshResult);

    // Vérifier si le refresh a réussi
    if (refreshResult.data) {
      const responseData = refreshResult.data as TokenResponse;

      if (responseData.access) {
        // Sauvegarder les nouveaux tokens
        localStorage.setItem("access", responseData.access);
        if (responseData.refresh) {
          localStorage.setItem("refresh", responseData.refresh);
          console.log("✅ New refresh token saved");
        }

        console.log("✅ Token refreshed successfully");
        console.log(
          "🆕 New access token:",
          responseData.access.substring(0, 20) + "..."
        );

        // Réessayer la requête originale avec le nouveau token
        console.log("🔄 Retrying original request...");
        result = await baseQuery(args, api, extraOptions);

        console.log("📨 Retry result:", {
          status: result.meta?.response?.status,
          error: result.error,
        });
      } else {
        console.error("❌ No access token in refresh response");
        throw new Error("Invalid refresh response: no access token");
      }
    } else {
      console.error("❌ Refresh failed:", refreshResult.error);

      // Si le refresh token est invalide/expiré
      if (refreshResult.error?.status === 401) {
        console.log("🔄 Refresh token expired, redirecting to login");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }

      throw new Error("Refresh request failed");
    }
  } catch (error) {
    console.error("💥 Refresh error:", error);

    // En cas d'erreur, nettoyer et rediriger
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
  }

  return result;
};
