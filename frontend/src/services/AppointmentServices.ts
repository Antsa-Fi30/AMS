import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../redux/baseQuery";
import axiosInstance from "./AxiosInstance";

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

export type DescriptionsType = { [key: string]: JSONValue };

export type Appointments = {
  id: number;
  code: string;
  type: string;
  descriptions: DescriptionsType | null;
  patient: number;
  patient_name: string;
  patient_phone: string;
  doctor: number | null;
  doctor_name: string | null;
  doctor_phone: string | null;
  notes: string | null;
  status: string;
  finished: boolean;
  disponibility: number | null;
  date: string | null;
  time: string | null;
  start_time: string | null;
  end_time: string | null;
  requested_at: string;
  updated_at: string;
};

export type AppointmentType = {
  results: Appointments[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type DoctorStatsType = {
  patients: number;
  scheduled: number;
  finished: number;
};

// Ajoutez ces types dans vos interfaces
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const appointmentsApi = createApi({
  reducerPath: "appointmentsApi",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Appointments"],
  endpoints: (builder) => ({
    getAppointments: builder.query<
      PaginatedResponse<Appointments>,
      number | void
    >({
      query: (page = 1) => `appointments/?page=${page}`,
      providesTags: ["Appointments"],
      keepUnusedDataFor: 60,
    }),
    getAllAppointments: builder.query<Appointments[], void>({
      query: () => "appointments/?page_size=1000",
      providesTags: ["Appointments"],
      transformResponse: (response: PaginatedResponse<Appointments>) =>
        response.results,
    }),
    getDoctorStats: builder.query<DoctorStatsType, void>({
      query: () => "appointments/doctor/stats/",
      providesTags: ["Appointments"],
    }),
    addAppointment: builder.mutation<Appointments, Partial<Appointments>>({
      query: (data) => ({
        url: "appointments/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Appointments"],
    }),
    updateAppointments: builder.mutation<
      Appointments,
      Partial<Appointments> & { id: number }
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
  useGetAllAppointmentsQuery,
  useGetDoctorStatsQuery,
  useAddAppointmentMutation,
  useUpdateAppointmentsMutation,
} = appointmentsApi;

export const futurAppointment = async () => {
  try {
    const response = await axiosInstance.get("appointments/doctor/futur");
    return response.data;
  } catch (error) {
    console.error("Error fetching future appointments:", error);
  }
};

export const lastAppointment = async () => {
  try {
    const response = await axiosInstance.get("appointments/patient/last/");
    return response.data;
  } catch (error) {
    console.error("Error fetching last appointment:", error);
  }
};

export const deleteAllFinished = async () => {
  try {
    const { data } = await axiosInstance.delete("appointments/patient/erase/");
    return data;
  } catch (error: unknown) {
    const message =
      error.response?.data?.detail ||
      error.message ||
      "Error deleting finished appointments";
    throw new Error(message);
  }
};
