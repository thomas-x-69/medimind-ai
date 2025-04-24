import React from "react";

const PatientsList = ({
  patients,
  isLoaded,
  selectedPatient,
  handlePatientClick,
  patientStatus,
  isExpanded,
  setIsExpanded,
  openModal,
}) => {
  // Render patient icon based on type
  const getPatientIcon = (icon) => {
    if (icon === "alert") {
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    } else if (icon === "user") {
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
          <path d="M12 11c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" />
        </svg>
      );
    } else if (icon === "video") {
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="6" width="14" height="12" rx="2" ry="2" />
          <polygon points="23 7 16 12 23 17 23 7" />
        </svg>
      );
    } else if (icon === "file") {
      return (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Patient's list</h2>
        <div className="flex items-center space-x-2">
          <button className="bg-black text-white rounded-full px-4 py-1 text-sm flex items-center hover:bg-gray-800 transition-colors duration-300">
            Today
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="ml-1"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <button
            onClick={() => openModal("add-patient")}
            className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {patients.map((patient, idx) => (
          <div
            key={patient.id}
            className={`flex items-center bg-white p-3 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md ${
              selectedPatient === patient.name
                ? "ring-2 ring-black ring-opacity-50"
                : ""
            } ${isExpanded[patient.id] ? "h-auto" : "h-16"} overflow-hidden`}
            onClick={() => handlePatientClick(patient.name)}
            style={{
              animation: isLoaded
                ? `fadeSlideIn 0.5s ease-out ${0.1 * idx}s both`
                : "none",
            }}
          >
            <div
              className={`bg-${
                patient.color
              }-100 p-3 rounded-full mr-3 transition-all duration-300 hover:bg-gray-100 relative ${
                patientStatus[patient.name] === "critical"
                  ? "ring-2 ring-red-500 ring-opacity-50"
                  : ""
              }`}
            >
              {getPatientIcon(patient.icon)}

              {/* Status indicator */}
              <span
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                  patientStatus[patient.name] === "critical"
                    ? "bg-red-500"
                    : patientStatus[patient.name] === "fair"
                    ? "bg-amber-500"
                    : "bg-green-500"
                } ${
                  patientStatus[patient.name] === "critical"
                    ? "animate-ping"
                    : ""
                }`}
              ></span>
            </div>

            <div className="flex-1">
              <div className="font-bold flex items-center">
                {patient.name}
                {patientStatus[patient.name] === "critical" && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-1.5 rounded animate-pulse">
                    Critical
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">{patient.type}</div>

              {/* Expandable content */}
              {isExpanded[patient.id] && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      Age: <span className="font-medium">38 yrs</span>
                    </div>
                    <div>
                      Gender: <span className="font-medium">Male</span>
                    </div>
                    <div>
                      Last visit: <span className="font-medium">Apr 15</span>
                    </div>
                    <div>
                      Doctor: <span className="font-medium">Dr. Olivia</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`bg-${
                  patient.color === "pink" ? "white" : `${patient.color}-200`
                } rounded-lg px-3 py-1 text-sm`}
              >
                {patient.time}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded({
                    ...isExpanded,
                    [patient.id]: !isExpanded[patient.id],
                  });
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform duration-300 ${
                    isExpanded[patient.id] ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsList;
