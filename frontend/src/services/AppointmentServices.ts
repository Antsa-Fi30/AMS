import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../redux/baseQuery";
// import axiosInstance from "./AxiosInstance";

export type AppointmentType = {
  id: number;
  reason: string;
  patient: number;
  patient_name: string;
  patient_phone: string;
  doctor: number | null;
  status: string;
  descriptions: string | null;
  date: string | null;
  time: string | null;
  expire: string;
  requested_at: string;
  updated_at: string;
};

export const appointmentsApi = createApi({
  reducerPath: "appointmentsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Appointments"],
  endpoints: (builder) => ({
    getAppointments: builder.query<AppointmentType[], void>({
      query: () => "appointments/",
      providesTags: ["Appointments"],
    }),
    updateAppointments: builder.mutation<
      AppointmentType,
      Partial<AppointmentType> & { id: number }
    >({
      query: ({ id, ...patch }) => ({
        url: `appointments/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Appointments"],
    }),
  }),
});

export const { useGetAppointmentsQuery, useUpdateAppointmentsMutation } =
  appointmentsApi;
