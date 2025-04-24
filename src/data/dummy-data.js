// Dummy data for the medical dashboard

// Patients data
export const patients = [
  {
    id: "p1",
    name: "Taigo Wilkinson",
    type: "Emergency Visit",
    time: "09:15 AM",
    gender: "Male",
    age: "38 Years 5 Months",
    contactInfo: "W-54-TES-MK72",
    symptoms: ["Fever", "Cough", "Heart Burn"],
    lastChecked: "21 April 2021",
    lastDoctor: "Dr. Everly",
    prescription: "AZ-095-XD",
    observations: "High fever and cough at normal hemoglobin levels.",
    vitals: {
      heartRate: 88,
      bloodPressure: "130/85",
      temperature: 38.2,
      oxygen: 97,
    },
    status: "critical",
    medications: [
      {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "2 times a day",
        instructions: "Dosepak - Day and Night before meal",
        status: "active",
      },
    ],
    icon: "alert",
    color: "red",
  },
  {
    id: "p2",
    name: "Samantha Williams",
    type: "Routine Check-Up",
    time: "09:15 AM",
    gender: "Female",
    age: "32 Years",
    contactInfo: "W-43-GH-NP12",
    symptoms: ["Headache", "Fatigue"],
    lastChecked: "15 April 2021",
    lastDoctor: "Dr. Olivia",
    vitals: {
      heartRate: 76,
      bloodPressure: "125/80",
      temperature: 36.8,
      oxygen: 99,
    },
    status: "stable",
    icon: "user",
    color: "blue",
  },
  {
    id: "p3",
    name: "Amy White",
    type: "Video Consultation",
    time: "09:15 AM",
    gender: "Female",
    age: "45 Years",
    contactInfo: "W-67-KL-ZX45",
    symptoms: ["Joint Pain", "Stiffness"],
    lastChecked: "10 April 2021",
    lastDoctor: "Dr. Patel",
    vitals: {
      heartRate: 82,
      bloodPressure: "135/90",
      temperature: 37.1,
      oxygen: 98,
    },
    status: "fair",
    icon: "video",
    color: "gray",
  },
  {
    id: "p4",
    name: "Tyler Young",
    type: "Report",
    time: "09:45 AM",
    gender: "Male",
    age: "19 Years",
    contactInfo: "W-23-AB-CD98",
    symptoms: ["Skin Rash", "Itching"],
    lastChecked: "05 April 2021",
    lastDoctor: "Dr. Thompson",
    vitals: {
      heartRate: 72,
      bloodPressure: "120/75",
      temperature: 36.6,
      oxygen: 100,
    },
    status: "stable",
    icon: "file",
    color: "green",
  },
];

// Calendar events
export const calendarEvents = [
  {
    id: "e1",
    time: "07:00",
    endTime: "07:30",
    title: "Emergency visit",
    location: "West camp, Room 312",
    patient: "Taigo Wilkinson",
    icon: "heart",
    color: "pink",
    type: "emergency",
  },
  {
    id: "e2",
    time: "07:30",
    endTime: "07:55",
    title: "Diagnostic test",
    location: "East camp, Laboratory, floor 5",
    patient: "Samantha Williams",
    icon: "file",
    color: "blue",
    type: "diagnostic",
  },
  {
    id: "e3",
    time: "08:00",
    endTime: "09:00",
    title: "Team daily planning",
    location: "East camp, Room 200",
    participants: [
      "Dr. Jones",
      "Dr. Smith",
      "Dr. Patel",
      "Dr. Thompson",
      "Dr. Wilson",
    ],
    icon: "team",
    color: "amber",
    type: "meeting",
    hasParticipants: true,
  },
  {
    id: "e4",
    time: "09:00",
    endTime: "09:30",
    title: "Emergency visit",
    location: "West camp, Room 312",
    patient: "Amy White",
    icon: "heart",
    color: "pink",
    type: "emergency",
  },
];

// Patient summary data
export const patientSummaryData = [
  { age: "22-32 Y/O", count: 14, time: "07:30 p.m" },
  { age: "32-45 Y/O", count: 5, time: null },
  { age: "45+ Y/O", count: 2, time: "12:00 p.m" },
];

// Visits summary data
export const visitsSummaryData = {
  stats: [
    { label: "AVERAGE", value: "24", unit: "min" },
    { label: "MINIMUM", value: "15", unit: "min" },
    { label: "MAXIMUM", value: "01:30", unit: "h" },
  ],
  chart: {
    labels: ["10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"],
    data: [3, 5, 4, 7, 6, 8, 9],
  },
};

// Conditions summary data
export const conditionsSummaryData = [
  { label: "STABLE", count: 14, color: "green", percent: 70 },
  { label: "FAIR", count: 5, color: "amber", percent: 25 },
  { label: "CRITICAL", count: 1, color: "red", percent: 5 },
];

// Sessions summary data
export const sessionsSummaryData = [
  {
    value: "03:45 h",
    label: "IN CLINIC",
    icon: "clipboard",
    type: "in-clinic",
    progress: 75,
  },
  {
    value: "02:00 min",
    label: "VIDEO CALLS",
    icon: "message",
    type: "video-calls",
    progress: 45,
  },
  {
    value: "00:24 min",
    label: "IN CHAT",
    icon: "coffee",
    type: "in-chat",
    progress: 15,
  },
];

// Dashboard layout order
export const defaultDashboardLayout = [
  "patients",
  "visits",
  "condition",
  "sessions",
];

// Calendar data
export const calendarData = {
  currentMonth: "May 2024",
  selectedDay: 15,
  weekDays: ["MO", "TU", "WE", "TH", "FR", "SA", "SU"],
  days: Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    isSelected: i + 1 === 15,
    hasEvent: [3, 8, 15, 22, 27].includes(i + 1),
  })),
};

// Generate random chart data
export const generateChartData = (
  points = 50,
  baseline = 30,
  variance = 15
) => {
  const data = [];
  for (let i = 0; i < points; i++) {
    data.push({
      x: i * 8,
      y: baseline + Math.random() * variance - variance / 2,
    });
  }

  // Add a significant data point
  if (points > 22) {
    data[22] = { x: 176, y: 10 };
  }

  return data;
};

// Doctor info
export const doctorInfo = {
  name: "Dr. Olivia",
  totalPatients: 45,
  events: 1,
  profileImage: null, // URL to profile image if available
};
