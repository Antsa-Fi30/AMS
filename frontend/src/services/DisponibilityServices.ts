import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../redux/baseQuery";
import axiosInstance from "./AxiosInstance";

export type DisponibilityResults = {
  id: number;
  start_time: string;
  end_time: string;
  doctor_name: string;
  doctor_phone: string;
  doctor: number;
};

export interface DisponibilityType {
  results: DisponibilityResults[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const disponibilityApi = createApi({
  reducerPath: "disponibilityApi",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Disponibilities"],
  endpoints: (builder) => ({
    getDispos: builder.query<DisponibilityType, void>({
      query: () => "disponibility/",
      providesTags: ["Disponibilities"],
      keepUnusedDataFor: 60,
    }),
    addDispo: builder.mutation<
      DisponibilityResults,
      Partial<DisponibilityResults>
    >({
      query: (data) => ({
        url: "disponibility/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Disponibilities"],
    }),
    updateDispo: builder.mutation<
      DisponibilityResults,
      Partial<DisponibilityResults> & { id: number }
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

export const GetDoctorDispos = async (doctorId: number) => {
  const response = await axiosInstance.get<DisponibilityResults[]>(
    `/disponibility/doctor_dispo/?id=${doctorId}`
  );
  return response.data;
};
