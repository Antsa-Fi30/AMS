/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

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

  if (result.error && result.error.status === 401) {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      const refreshResult = await baseQuery(
        {
          url: "token/refresh/",
          method: "POST",
          body: { refresh },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const newAccess = (refreshResult.data as any).access;
        localStorage.setItem("access", newAccess);

        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }
  }

  return result;
};
