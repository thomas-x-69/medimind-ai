import React, { useState } from "react";
import { formatFullDate } from "@/utils/date-utils";

const PatientsList = ({ patients, onEdit, onDelete, onView }) => {
  const [hoveredId, setHoveredId] = useState(null);

  // 2025 Trendy color schemes - Bold and vibrant
  const getCardStyles = (visitType, status) => {
    const baseStyles = {
      // Default styles
      gradient: "bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50",
      accent: "from-violet-400 to-indigo-500",
      border: "border-violet-200",
      shadow: "shadow-violet-200/40",
      iconBg: "bg-gradient-to-br from-violet-200 to-indigo-300",
    };

    // Colorful styles based on visit type
    switch (visitType.toLowerCase()) {
      case "emergency visit":
        return {
          gradient: "bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100",
          accent: "from-rose-400 to-pink-500",
          border: "border-rose-200",
          shadow:
            status === "critical" ? "shadow-rose-300/50" : "shadow-rose-200/30",
          iconBg: "bg-gradient-to-br from-rose-200 to-pink-300",
          glow: status === "critical" ? "shadow-lg shadow-rose-200/50" : "",
        };
      case "diagnostic test":
        return {
          gradient: "bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-100",
          accent: "from-cyan-400 to-blue-500",
          border: "border-cyan-200",
          shadow: "shadow-cyan-200/30",
          iconBg: "bg-gradient-to-br from-cyan-200 to-blue-300",
        };
      case "video consultation":
      case "online visit":
        return {
          gradient:
            "bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-100",
          accent: "from-indigo-400 to-violet-500",
          border: "border-indigo-200",
          shadow: "shadow-indigo-200/30",
          iconBg: "bg-gradient-to-br from-indigo-200 to-violet-300",
        };
      case "team planning":
      case "team results":
        return {
          gradient:
            "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100",
          accent: "from-amber-400 to-orange-500",
          border: "border-amber-200",
          shadow: "shadow-amber-200/30",
          iconBg: "bg-gradient-to-br from-amber-200 to-orange-300",
        };
      case "follow-up":
        return {
          gradient:
            "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100",
          accent: "from-emerald-400 to-teal-500",
          border: "border-emerald-200",
          shadow: "shadow-emerald-200/30",
          iconBg: "bg-gradient-to-br from-emerald-200 to-teal-300",
        };
      case "interns visit":
        return {
          gradient: "bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-100",
          accent: "from-blue-400 to-sky-500",
          border: "border-blue-200",
          shadow: "shadow-blue-200/30",
          iconBg: "bg-gradient-to-br from-blue-200 to-sky-300",
        };
      default:
        return baseStyles;
    }
  };

  // Playful 3D-style icons for 2025
  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "emergency visit":
        return (
          <div className="relative transform transition-transform duration-300 hover:scale-110">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                fill="currentColor"
                opacity="0.2"
              />
              <path
                d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="12"
                y1="9"
                x2="12"
                y2="13"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="12"
                y1="17"
                x2="12.01"
                y2="17"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        );
      case "diagnostic test":
        return (
          <div className="relative transform transition-transform duration-300 hover:rotate-12">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 12h-4l-3 9L9 3l-3 9H2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="9"
                cy="12"
                r="1.5"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
          </div>
        );
      case "video consultation":
      case "online visit":
        return (
          <div className="relative transform transition-transform duration-300 hover:scale-110">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="6"
                width="14"
                height="12"
                rx="2"
                fill="currentColor"
                opacity="0.2"
              />
              <rect
                x="2"
                y="6"
                width="14"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <polygon
                points="23 7 16 12 23 17 23 7"
                fill="currentColor"
                opacity="0.3"
              />
              <polygon
                points="23 7 16 12 23 17 23 7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        );
      case "team planning":
      case "team results":
        return (
          <div className="relative transform transition-transform duration-300 hover:rotate-12">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="9"
                cy="7"
                r="4"
                fill="currentColor"
                opacity="0.2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M23 21v-2a4 4 0 0 0-3-3.87"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M16 3.13a4 4 0 0 1 0 7.75"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        );
      case "follow-up":
        return (
          <div className="relative transform transition-transform duration-300 hover:scale-110">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 11l3 3L22 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                fill="currentColor"
                opacity="0.1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        );
      case "interns visit":
        return (
          <div className="relative transform transition-transform duration-300 hover:scale-110">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                fill="currentColor"
                opacity="0.2"
              />
              <path
                d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <polyline
                points="9 22 9 12 15 12 15 22"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="relative transform transition-transform duration-300 hover:scale-110">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
                fill="currentColor"
                opacity="0.2"
              />
              <path
                d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M12 11c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z"
                fill="currentColor"
                opacity="0.1"
              />
              <path
                d="M12 11c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        );
    }
  };

  // Render a patient card with 2025 styling
  const renderPatientCard = (patient) => {
    const cardStyles = getCardStyles(patient.type, patient.status);
    const isHovered = hoveredId === patient.id;

    // Determine status element with animation
    let statusElement = null;
    if (patient.status === "critical") {
      statusElement = (
        <div className="absolute top-3 right-3 flex items-center">
          <span className="animate-ping absolute h-2.5 w-2.5 rounded-full bg-rose-500 opacity-75"></span>
          <span className="relative rounded-full h-3 w-3 bg-rose-500"></span>
          <span className="ml-1.5 text-xs font-semibold text-white px-2 py-0.5 rounded-md bg-gradient-to-r from-rose-500 to-pink-600">
            Critical
          </span>
        </div>
      );
    } else if (patient.status === "fair") {
      statusElement = (
        <div className="absolute top-3 right-3">
          <span className="h-3 w-3 rounded-full bg-amber-500 inline-block mr-1"></span>
          <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
            Fair
          </span>
        </div>
      );
    } else {
      statusElement = (
        <div className="absolute top-3 right-3">
          <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block mr-1"></span>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
            Stable
          </span>
        </div>
      );
    }

    return (
      <div
        key={patient.id}
        className={`relative overflow-hidden backdrop-blur-sm border-2 ${
          cardStyles.border
        } 
        rounded-2xl transition-all duration-300 transform ${
          cardStyles.gradient
        } 
        ${cardStyles.shadow} ${isHovered ? "scale-[1.03]" : ""} ${
          cardStyles.glow || ""
        }`}
        style={{
          boxShadow: isHovered
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            : "",
        }}
        onMouseEnter={() => setHoveredId(patient.id)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => onView(patient)}
      >
        {/* Decorative elements - 2025 style */}
        <div
          className={`absolute -right-12 -top-12 w-24 h-24 rounded-full bg-gradient-to-br ${cardStyles.accent} opacity-20 blur-xl`}
        ></div>
        <div className="absolute -left-10 -bottom-10 w-20 h-20 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 opacity-10 blur-xl"></div>

        {/* Card content */}
        <div className="p-5 relative z-10">
          {/* Status indicator */}
          {statusElement}

          {/* Patient header with type icon */}
          <div className="flex items-start space-x-3 mb-4">
            <div
              className={`${cardStyles.iconBg} p-3 rounded-xl relative text-gray-800`}
            >
              {getTypeIcon(patient.type)}
            </div>

            <div className="flex-1 pt-1">
              <h3 className="font-bold text-base text-gray-800">
                {patient.name}
              </h3>
              <div className="flex items-center text-xs text-gray-600 mt-0.5">
                <span className="font-medium">{patient.time}</span>
                <span className="mx-1.5">•</span>
                <span>{patient.type}</span>
              </div>
            </div>
          </div>

          {/* Location info with modern icon */}
          {patient.location && (
            <div className="mb-3 bg-white/60 backdrop-blur-sm rounded-lg p-2 flex items-start">
              <svg
                className="w-4 h-4 mr-1.5 mt-0.5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-xs text-gray-700">{patient.location}</span>
            </div>
          )}

          {/* Vitals with playful visualizations - 2025 trend */}
          {patient.vitals && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center">
                <div className="text-rose-500 mb-1 relative">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <div className="absolute inset-0 bg-rose-500 opacity-10 rounded-full blur-sm"></div>
                </div>
                <div className="text-sm font-bold">
                  {patient.vitals.heartRate}
                </div>
                <div className="text-xs text-gray-500">bpm</div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center">
                <div className="text-blue-500 mb-1 relative">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-full blur-sm"></div>
                </div>
                <div className="text-sm font-bold">
                  {patient.vitals.bloodPressure}
                </div>
                <div className="text-xs text-gray-500">mmHg</div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center">
                <div className="text-amber-500 mb-1 relative">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2" />
                    <path d="M12 21v2" />
                    <path d="M4.22 4.22l1.42 1.42" />
                    <path d="M18.36 18.36l1.42 1.42" />
                    <path d="M1 12h2" />
                    <path d="M21 12h2" />
                    <path d="M4.22 19.78l1.42-1.42" />
                    <path d="M18.36 5.64l1.42-1.42" />
                  </svg>
                  <div className="absolute inset-0 bg-amber-500 opacity-10 rounded-full blur-sm"></div>
                </div>
                <div className="text-sm font-bold">
                  {patient.vitals.temperature}°
                </div>
                <div className="text-xs text-gray-500">Celsius</div>
              </div>
            </div>
          )}

          {/* Symptoms with modern chip design */}
          {patient.symptoms && patient.symptoms.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {patient.symptoms.slice(0, 3).map((symptom, index) => (
                <span
                  key={index}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-100 text-gray-700 font-medium"
                >
                  {symptom}
                </span>
              ))}
              {patient.symptoms.length > 3 && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100/80 text-gray-700 font-medium">
                  +{patient.symptoms.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Action buttons with modern styling */}
          <div
            className={`flex justify-between mt-3 pt-3 border-t border-gray-200/50 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-90"
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(patient);
              }}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg hover:shadow-md transition-all duration-300 
                bg-gradient-to-r ${cardStyles.accent} text-white flex items-center`}
            >
              <span>View Details</span>
              <svg
                className="w-3.5 h-3.5 ml-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </button>

            <div className="flex space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(patient);
                }}
                className="p-1.5 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-200/50 text-gray-500 hover:bg-white hover:text-gray-700 transition-all duration-300 hover:shadow-sm"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(patient);
                }}
                className="p-1.5 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-200/50 text-gray-500 hover:bg-white hover:text-rose-600 transition-all duration-300 hover:shadow-sm"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show empty state with 2025 styling
  if (patients.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl shadow-lg p-12 text-center border-2 border-gray-200">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full flex items-center justify-center mb-5 relative">
          <svg
            className="w-10 h-10 text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
            <path d="M12 11c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" />
          </svg>
          <div className="absolute inset-0 bg-indigo-500 opacity-20 rounded-full blur-xl"></div>
        </div>
        <h3 className="text-gray-800 font-bold text-xl mb-2">
          No patients found
        </h3>
        <p className="text-gray-600 mb-5">
          Try adjusting your search or filters, or add a new patient
        </p>
        <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
          Add Patient
        </button>
      </div>
    );
  }

  // Render grid of patient cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {patients.map((patient) => renderPatientCard(patient))}
    </div>
  );
};

export default PatientsList;
