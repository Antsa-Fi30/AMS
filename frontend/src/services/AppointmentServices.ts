import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../redux/baseQuery";
import axiosInstance from "./AxiosInstance";

export type DescriptionType = {
  symptoms?: string[];
  severity?: string | null;
  duration?: string;
  detectedBy?: string;
};

export type AppointmentType = {
  id: number;
  reason: string;
  patient: number;
  patient_name: string;
  patient_phone: string;
  doctor: number | null;
  doctor_name: string | null;
  doctor_phone: string | null;
  notes: string | null;
  status: string;
  finished: boolean;
  descriptions: DescriptionType | null;
  date: string | null;
  time: string | null;
  expire: string | null;
  requested_at: string;
  updated_at: string;
};

export type DoctorStatsType = {
  patients: number;
  scheduled: number;
  finished: number;
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
      keepUnusedDataFor: 60,
    }),
    getDoctorStats: builder.query<DoctorStatsType, void>({
      query: () => "doctor/stats/",
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
  useGetDoctorStatsQuery,
  useAddAppointmentMutation,
  useUpdateAppointmentsMutation,
} = appointmentsApi;

export const futurAppointment = async () => {
  try {
    const response = await axiosInstance.get("/doctor/futur");
    return response.data;
  } catch (error) {
    console.error("Error fetching future appointments:", error);
  }
};

export const deleteAllFinished = async () => {
  try {
    const { data } = await axiosInstance.delete("/patient/erase/");
    return data;
  } catch (error: unknown) {
    const message =
      error.response?.data?.detail ||
      error.message ||
      "Error deleting finished appointments";
    throw new Error(message);
  }
};
