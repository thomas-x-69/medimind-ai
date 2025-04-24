import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientsList: [
    {
      id: "p1",
      name: "Taigo Wilkinson",
      type: "Emergency Visit",
      time: "08:15 AM",
      gender: "Male",
      age: "28 Years 6 Months",
      contactInfo: "W-54-TES-MK72",
      symptoms: ["Fever", "Cough", "Heart Burn"],
      lastChecked: "23 April 2021",
      prescription: "AZ-095-XD",
      observations: "High fever and cough at normal hemoglobin levels.",
      medications: [
        {
          name: "Paracetamol",
          dosage: "2 times a day",
          instructions: "Dosepak - Day and Night before meal",
        },
      ],
    },
    {
      id: "p2",
      name: "Samantha Williams",
      type: "Routine Check-Up",
      time: "09:15 AM",
      gender: "Female",
      age: "32 Years",
      contactInfo: "W-43-GH-NP12",
    },
    {
      id: "p3",
      name: "Amy White",
      type: "Video Consultation",
      time: "10:15 AM",
      gender: "Female",
      age: "45 Years",
      contactInfo: "W-67-KL-ZX45",
    },
    {
      id: "p4",
      name: "Tyler Young",
      type: "Report",
      time: "02:45 PM",
      gender: "Male",
      age: "19 Years",
      contactInfo: "W-23-AB-CD98",
    },
  ],
  loading: false,
  error: null,
  selectedPatient: null,
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
    addPatient: (state, action) => {
      state.patientsList.push(action.payload);
    },
    updatePatient: (state, action) => {
      const index = state.patientsList.findIndex(
        (patient) => patient.id === action.payload.id
      );
      if (index !== -1) {
        state.patientsList[index] = action.payload;
      }
    },
    deletePatient: (state, action) => {
      state.patientsList = state.patientsList.filter(
        (patient) => patient.id !== action.payload
      );
    },
  },
});

export const { setSelectedPatient, addPatient, updatePatient, deletePatient } =
  patientsSlice.actions;

export const selectAllPatients = (state) => state.patients.patientsList;
export const selectSelectedPatient = (state) => state.patients.selectedPatient;
export const selectPatientsByType = (state) => {
  const patientsByType = {
    emergency: 0,
    routine: 0,
    video: 0,
    other: 0,
  };

  state.patients.patientsList.forEach((patient) => {
    if (patient.type.toLowerCase().includes("emergency")) {
      patientsByType.emergency++;
    } else if (patient.type.toLowerCase().includes("routine")) {
      patientsByType.routine++;
    } else if (patient.type.toLowerCase().includes("video")) {
      patientsByType.video++;
    } else {
      patientsByType.other++;
    }
  });

  return patientsByType;
};

export default patientsSlice.reducer;
