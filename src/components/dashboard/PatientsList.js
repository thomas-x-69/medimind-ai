import React from "react";
import { ChevronDown, Plus } from "lucide-react";

const PatientsList = ({
  isLoaded = false,
  onPatientClick,
  selectedPatient,
}) => {
  // Static data to match the design
  const patients = [
    {
      id: "p1",
      name: "Taigo Wilkinson",
      type: "Emergency Visit",
      time: "09 : 15 AM",
      icon: "alert",
      color: "pink",
    },
    {
      id: "p2",
      name: "Samantha Williams",
      type: "Routine Check-Up",
      time: "09 : 15 AM",
      icon: "user",
      color: "blue",
    },
    {
      id: "p3",
      name: "Amy White",
      type: "Video Consultation",
      time: "09 : 15 AM",
      icon: "video",
      color: "gray",
    },
    {
      id: "p4",
      name: "Tyler Young",
      type: "Report",
      time: "09 : 45 AM",
      icon: "file",
      color: "green",
    },
  ];

  // Get background color based on visit type
  const getVisitTypeBackground = (type) => {
    if (type.toLowerCase().includes("emergency")) {
      return "bg-red-50 text-red-700";
    } else if (type.toLowerCase().includes("routine")) {
      return "bg-blue-50 text-blue-700";
    } else if (type.toLowerCase().includes("video")) {
      return "bg-gray-100 text-gray-700";
    } else {
      return "bg-green-50 text-green-700";
    }
  };

  const getPatientIcon = (type) => {
    if (type === "alert") {
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="12"
            y1="9"
            x2="12"
            y2="13"
            strokeWidth="2"
            stroke="currentColor"
          />
          <line
            x1="12"
            y1="17"
            x2="12.01"
            y2="17"
            strokeWidth="2"
            stroke="currentColor"
          />
        </svg>
      );
    } else if (type === "user") {
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 11c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    } else if (type === "video") {
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="6"
            width="14"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M16 10l4 -2v8l-4 -2" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 3v4a1 1 0 0 0 1 1h4"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Patient's list</h3>
        <div className="flex items-center space-x-2">
          <button className="bg-black text-white py-1 px-4 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-300">
            Today <ChevronDown size={14} className="inline ml-1" />
          </button>
          <button className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className={`bg-white p-3 rounded-xl flex items-center cursor-pointer transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md ${
              selectedPatient === patient.name
                ? "ring-2 ring-black ring-opacity-25"
                : ""
            }`}
            onClick={() => onPatientClick && onPatientClick(patient.name)}
          >
            <div className={`bg-${patient.color}-100 p-3 rounded-full mr-3`}>
              {getPatientIcon(patient.icon)}
            </div>

            <div className="flex-1">
              <div className="font-semibold">{patient.name}</div>
              <div
                className={`text-xs ${getVisitTypeBackground(
                  patient.type
                )} inline-block px-2 py-0.5 rounded-full`}
              >
                {patient.type}
              </div>
            </div>

            <div className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full">
              {patient.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
