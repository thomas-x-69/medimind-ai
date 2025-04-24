import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "./slices/patientsSlice";
import appointmentsReducer from "./slices/appointmentsSlice";
import dashboardReducer from "./slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    appointments: appointmentsReducer,
    dashboard: dashboardReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
