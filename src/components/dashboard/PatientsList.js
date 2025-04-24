import React from "react";

const PatientsList = () => {
  // Static data to match the design
  const patients = [
    {
      id: "p1",
      name: "Taigo Wilkinson",
      type: "Emergency Visit",
      time: "09 : 15 AM",
      iconColor: "bg-red-100 text-red-500",
    },
    {
      id: "p2",
      name: "Samantha Williams",
      type: "Routine Check-Up",
      time: "09 : 15 AM",
      iconColor: "bg-blue-100 text-blue-500",
    },
    {
      id: "p3",
      name: "Amy White",
      type: "Video Consultation",
      time: "09 : 15 AM",
      iconColor: "bg-gray-100 text-gray-500",
    },
    {
      id: "p4",
      name: "Tyler Young",
      type: "Report",
      time: "09 : 45 AM",
      iconColor: "bg-green-100 text-green-500",
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
    if (type.toLowerCase().includes("emergency")) {
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 12H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 8V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("routine")) {
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 12L11 15L16 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("video")) {
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 10L19.5528 7.72361C19.8343 7.58281 20 7.29346 20 6.97979V17.0202C20 17.3339 19.8343 17.6233 19.5528 17.7639L15 20V10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="3"
            y="6"
            width="12"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
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
            d="M9 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9 14H13L21 6L18 3L10 11V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Patient's list</h3>
        <button className="bg-black text-white py-1 px-4 rounded-full text-sm font-medium">
          Today <span className="ml-1">▼</span>
        </button>
      </div>

      <div className="space-y-3">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm"
          >
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${patient.iconColor}`}
                  >
                    {getPatientIcon(patient.type)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">{patient.name}</h4>
                    <div
                      className={`text-xs px-2 py-0.5 rounded-full inline-block ${getVisitTypeBackground(
                        patient.type
                      )}`}
                    >
                      {patient.type}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full">
                    {patient.time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
