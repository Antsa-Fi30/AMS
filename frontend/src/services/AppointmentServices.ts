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
  doctor_name: string | null;
  status: string;
  descriptions: string | null;
  date: string | null;
  time: string | null;
  expire: string | null;
  requested_at: string;
  updated_at: string;
};

export const appointmentsApi = createApi({
  reducerPath: "appointmentsApi",
  refetchOnFocus: true, // quand l'utilisateur revient sur l'onglet
  refetchOnReconnect: true, // quand la connexion revient
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Appointments"],
  endpoints: (builder) => ({
    getAppointments: builder.query<AppointmentType[], void>({
      query: () => "appointments/",
      providesTags: ["Appointments"],
    }),
    addAppointment: builder.mutation<AppointmentType, Partial<AppointmentType>>(
      {
        query: (data) => ({
          url: "appointments/",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Appointments"],
      }
    ),
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

export const {
  useGetAppointmentsQuery,
  useAddAppointmentMutation,
  useUpdateAppointmentsMutation,
} = appointmentsApi;
