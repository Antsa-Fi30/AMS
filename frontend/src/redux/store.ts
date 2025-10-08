// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { appointmentsApi } from "../services/AppointmentServices";
import authReducer from "./AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appointmentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
