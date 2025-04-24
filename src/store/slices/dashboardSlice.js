import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorName: "Dr. Olivia",
  totalPatients: 45,
  patientsSummary: {
    regular: 14,
    new: 5,
    priority: 2,
  },
  conditionsSummary: {
    stable: 14,
    fair: 5,
    critical: 1,
  },
  currentDate: new Date().toISOString(),
  selectedDate: new Date().toISOString(),
  loading: false,
  error: null,
  visitChartData: [
    { time: "10:30", value: 3 },
    { time: "11:00", value: 5 },
    { time: "11:30", value: 4 },
    { time: "12:00", value: 7 },
    { time: "12:30", value: 6 },
    { time: "13:00", value: 8 },
    { time: "13:30", value: 9 },
  ],
  patientChartData: [
    { time: "07:30", value: 1 },
    { time: "08:00", value: 2 },
    { time: "09:00", value: 5 },
    { time: "10:00", value: 3 },
    { time: "11:00", value: 4 },
    { time: "12:00", value: 6 },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDoctorName: (state, action) => {
      state.doctorName = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    updatePatientsSummary: (state, action) => {
      state.patientsSummary = { ...state.patientsSummary, ...action.payload };
    },
    updateConditionsSummary: (state, action) => {
      state.conditionsSummary = {
        ...state.conditionsSummary,
        ...action.payload,
      };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setDoctorName,
  setSelectedDate,
  updatePatientsSummary,
  updateConditionsSummary,
  setLoading,
  setError,
} = dashboardSlice.actions;

export const selectDoctorName = (state) => state.dashboard.doctorName;
export const selectTotalPatients = (state) => state.dashboard.totalPatients;
export const selectPatientsSummary = (state) => state.dashboard.patientsSummary;
export const selectConditionsSummary = (state) =>
  state.dashboard.conditionsSummary;
export const selectSelectedDate = (state) => state.dashboard.selectedDate;
export const selectVisitChartData = (state) => state.dashboard.visitChartData;
export const selectPatientChartData = (state) =>
  state.dashboard.patientChartData;

export default dashboardSlice.reducer;
