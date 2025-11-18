import {
  fetchBaseQuery,
  type FetchArgs,
  type FetchBaseQueryError,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query/react";

interface ExtraOptions {
  currentAccessToken?: string;
}

interface TokenResponse {
  access: string;
  refresh: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/",
  prepareHeaders: (headers, { extra }) => {
    const token =
      (extra as ExtraOptions)?.currentAccessToken ||
      localStorage.getItem("access");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
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

  if (result.error?.status !== 401) {
    return result;
  }

  const refreshToken = localStorage.getItem("refresh");
  if (!refreshToken) {
    localStorage.clear();
    window.location.href = "/login";
    return result;
  }

  // 🔄 REFRESH
  const refreshResult = await baseQuery(
    {
      url: "token/refresh/",
      method: "POST",
      body: { refresh: refreshToken },
    },
    api,
    extraOptions
  );

  const tokenData = refreshResult.data as TokenResponse | undefined;

  if (tokenData?.access) {
    const newAccess = tokenData.access;

    localStorage.setItem("access", newAccess);

    api.extra = { currentAccessToken: newAccess };

    result = await baseQuery(args, api, extraOptions);

    return result;
  }

  localStorage.clear();
  window.location.href = "/login";
  return result;
};
