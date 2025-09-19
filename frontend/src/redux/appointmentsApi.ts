import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

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
  endpoints: (builder) => ({
    getAppointments: builder.query<AppointmentType[], void>({
      query: () => "appointments/",
    }),
  }),
});

export const { useGetAppointmentsQuery } = appointmentsApi;
