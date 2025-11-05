// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { appointmentsApi } from "../services/AppointmentServices";
import { disponibilityApi } from "../services/DisponibilityServices";
import authReducer from "./AuthSlice";

const apiMiddlewares = [
  appointmentsApi.middleware,
  disponibilityApi.middleware,
];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
    [disponibilityApi.reducerPath]: disponibilityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
