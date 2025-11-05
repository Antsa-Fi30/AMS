import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../redux/baseQuery";

export interface DisponibilityType {
  id?: number;
  start_time: string;
  end_time: string;
  doctor: number;
}

export const disponibilityApi = createApi({
  reducerPath: "disponibilityApi",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Disponibilities"],
  endpoints: (builder) => ({
    getDispos: builder.query<DisponibilityType[], void>({
      query: () => "disponibility/",
      providesTags: ["Disponibilities"],
      keepUnusedDataFor: 60,
    }),
    addDispo: builder.mutation<DisponibilityType, Partial<DisponibilityType>>({
      query: (data) => ({
        url: "disponibility/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Disponibilities"],
    }),
    updateDispo: builder.mutation<
      DisponibilityType,
      Partial<DisponibilityType> & { id: number }
    >({
      query: ({ id, ...patch }) => ({
        url: `disponibility/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Disponibilities"],
    }),
    deleteAllDispo: builder.mutation<void, void>({
      query: () => ({
        url: `disponibility/delete_all/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Disponibilities"],
    }),
  }),
});

export const {
  useGetDisposQuery,
  useAddDispoMutation,
  useUpdateDispoMutation,
  useDeleteAllDispoMutation,
} = disponibilityApi;
