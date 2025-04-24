import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [
    {
      id: "a1",
      patientId: "p1",
      title: "Emergency visit",
      startTime: "07:00",
      endTime: "07:30",
      date: "2024-05-15",
      location: "West Wing, Room 312",
      type: "emergency",
    },
    {
      id: "a2",
      patientId: "p2",
      title: "Diagnostic test",
      startTime: "09:30",
      endTime: "10:00",
      date: "2024-05-15",
      location: "East wing, Laboratory, Floor 3",
      type: "diagnostic",
    },
    {
      id: "a3",
      patientId: "p5",
      title: "Team daily planning",
      startTime: "08:30",
      endTime: "09:00",
      date: "2024-05-15",
      location: "East wing, Room 200",
      type: "meeting",
      participants: ["Dr. Jones", "Dr. Smith", "Dr. Patel"],
    },
    {
      id: "a4",
      patientId: "p1",
      title: "Emergency visit",
      startTime: "09:00",
      endTime: "09:30",
      date: "2024-05-15",
      location: "West Wing, Room 312",
      type: "emergency",
    },
  ],
  loading: false,
  error: null,
  visitsSummary: {
    average: 24,
    morning: 15,
    duration: "01:30 h",
  },
  sessionsSummary: {
    inClinic: "03:45 h",
    videoCalls: "02:00 min",
    inChat: "00:24 min",
  },
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(
        (app) => app.id === action.payload.id
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (app) => app.id !== action.payload
      );
    },
    updateVisitsSummary: (state, action) => {
      state.visitsSummary = { ...state.visitsSummary, ...action.payload };
    },
    updateSessionsSummary: (state, action) => {
      state.sessionsSummary = { ...state.sessionsSummary, ...action.payload };
    },
  },
});

export const {
  addAppointment,
  updateAppointment,
  deleteAppointment,
  updateVisitsSummary,
  updateSessionsSummary,
} = appointmentsSlice.actions;

export const selectAllAppointments = (state) => state.appointments.appointments;
export const selectAppointmentsByDate = (state, date) => {
  return state.appointments.appointments.filter((app) => app.date === date);
};
export const selectVisitsSummary = (state) => state.appointments.visitsSummary;
export const selectSessionsSummary = (state) =>
  state.appointments.sessionsSummary;

export default appointmentsSlice.reducer;
