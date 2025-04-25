// src/components/patients/PatientsList.js
import React, { useState } from "react";
import { formatFullDate } from "@/utils/date-utils";

const PatientsList = ({ patients, onEdit, onDelete, onView }) => {
  const [hoveredId, setHoveredId] = useState(null);

  // Color schemes based exactly on the calendar image
  const getCardStyles = (visitType) => {
    switch (visitType.toLowerCase()) {
      case "emergency visit":
        return {
          bg: "bg-[#fff2f4]", // Light pink background from image
          border: "border-[#ffcbd3]",
          accent: "bg-[#f27c96]", // Pink accent from emergency visit
          text: "text-[#9e3c57]",
          icon: "text-[#f27c96]",
          iconBg: "bg-[#ffecf0]",
        };
      case "diagnostic test":
        return {
          bg: "bg-[#edf5ff]", // Light blue background from image
          border: "border-[#c6deff]",
          accent: "bg-[#5c8ce6]", // Blue accent
          text: "text-[#2c5fba]",
          icon: "text-[#5c8ce6]",
          iconBg: "bg-[#e5f0ff]",
        };
      case "online visit":
      case "video consultation":
        return {
          bg: "bg-[#edf5ff]", // Light blue background from image
          border: "border-[#c6deff]",
          accent: "bg-[#5c8ce6]", // Blue accent
          text: "text-[#2c5fba]",
          icon: "text-[#5c8ce6]",
          iconBg: "bg-[#e5f0ff]",
        };
      case "team planning":
      case "team results":
        return {
          bg: "bg-[#fff8e5]", // Light yellow background from image
          border: "border-[#ffe9b0]",
          accent: "bg-[#f8c745]", // Yellow accent from team events
          text: "text-[#97712b]",
          icon: "text-[#f8c745]",
          iconBg: "bg-[#fff6d6]",
        };
      case "follow-up":
        return {
          bg: "bg-[#f2fff5]", // Light green background
          border: "border-[#c9f1d3]",
          accent: "bg-[#60cf80]", // Green accent
          text: "text-[#2e8745]",
          icon: "text-[#60cf80]",
          iconBg: "bg-[#e5fbec]",
        };
      case "interns visit":
        return {
          bg: "bg-[#f0f3ff]", // Light indigo background
          border: "border-[#d3dcff]",
          accent: "bg-[#8893ec]", // Indigo accent
          text: "text-[#4957c9]",
          icon: "text-[#8893ec]",
          iconBg: "bg-[#ebefff]",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          accent: "bg-gray-500",
          text: "text-gray-700",
          icon: "text-gray-500",
          iconBg: "bg-gray-100",
        };
    }
  };

  // Get status style
  const getStatusStyle = (status) => {
    switch (status) {
      case "critical":
        return {
          dot: "bg-[#f27c96]", // Emergency pink
          bg: "bg-[#fff2f4]",
          text: "text-[#9e3c57]",
        };
      case "fair":
        return {
          dot: "bg-[#f8c745]", // Team amber
          bg: "bg-[#fff8e5]",
          text: "text-[#97712b]",
        };
      default:
        return {
          dot: "bg-[#60cf80]", // Green
          bg: "bg-[#f2fff5]",
          text: "text-[#2e8745]",
        };
    }
  };

  // Icons taken directly from the calendar UI style
  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "emergency visit":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        );
      case "diagnostic test":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        );
      case "online visit":
      case "video consultation":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="6" width="14" height="12" rx="2" ry="2"></rect>
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
          </svg>
        );
      case "team planning":
      case "team results":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      case "follow-up":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        );
      case "interns visit":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
            <path d="M12 11c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z"></path>
          </svg>
        );
    }
  };

  // Render a patient card to match the calendar style
  const renderPatientCard = (patient) => {
    const cardStyles = getCardStyles(patient.type);
    const statusStyle = getStatusStyle(patient.status);
    const isHovered = hoveredId === patient.id;

    return (
      <div
        key={patient.id}
        className={`${cardStyles.bg} border ${
          cardStyles.border
        } rounded-lg overflow-hidden transition-all duration-200 
          ${isHovered ? "shadow-md" : "shadow-sm"}`}
        onMouseEnter={() => setHoveredId(patient.id)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => onView(patient)}
      >
        <div className="p-4">
          {/* Header with icon - matching the calendar events */}
          <div className="flex items-start mb-3">
            <div
              className={`${cardStyles.iconBg} p-2.5 rounded-lg mr-3 ${cardStyles.icon} relative`}
            >
              {getTypeIcon(patient.type)}

              {/* Status indicator dot like in the calendar */}
              {patient.status === "critical" && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#f27c96] animate-pulse"></span>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-[#111827]">{patient.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{patient.type}</p>
            </div>

            {/* Time display like in calendar */}
            <div className="text-xs font-medium bg-white px-2 py-1 rounded-md">
              {patient.time}
            </div>
          </div>

          {/* Location - matching calendar style */}
          {patient.location && (
            <div className="text-xs text-gray-500 mb-3 ml-1">
              {patient.location}
            </div>
          )}

          {/* Participants section if applicable - like in calendar */}
          {patient.participants && (
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Participants</div>
              <div className="flex space-x-1">
                {patient.participants.map((participant, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-700"
                  >
                    {participant.substring(0, 2)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Symptoms as tags */}
          {patient.symptoms && patient.symptoms.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {patient.symptoms.slice(0, 3).map((symptom, index) => (
                <span
                  key={index}
                  className="text-xs bg-white px-2 py-0.5 rounded-md"
                >
                  {symptom}
                </span>
              ))}
              {patient.symptoms.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{patient.symptoms.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Simple button row */}
          <div className="flex justify-between mt-3 pt-2 border-t border-gray-100">
            {/* Status badge */}
            {patient.status && (
              <div
                className={`flex items-center ${statusStyle.bg} ${statusStyle.text} px-2 py-0.5 text-xs font-medium rounded-md`}
              >
                <span
                  className={`w-1.5 h-1.5 ${
                    statusStyle.dot
                  } rounded-full mr-1 ${
                    patient.status === "critical" ? "animate-pulse" : ""
                  }`}
                ></span>
                {patient.status.charAt(0).toUpperCase() +
                  patient.status.slice(1)}
              </div>
            )}

            <div className="flex space-x-2 ml-auto">
              {/* Join button like in calendar if appointment is approaching */}
              {patient.status === "critical" && (
                <button
                  className={`${cardStyles.accent} text-white px-3 py-1 text-xs font-medium rounded-md`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(patient);
                  }}
                >
                  View now
                </button>
              )}

              {/* Edit button */}
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(patient);
                }}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>

              {/* Delete button */}
              <button
                className="text-gray-400 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(patient);
                }}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Empty state that matches the website style
  if (patients.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
            <path d="M12 11c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </div>
        <h3 className="text-gray-800 font-medium text-lg mb-1">
          No patients found
        </h3>
        <p className="text-gray-500">
          Try adjusting your search or filters, or add a new patient
        </p>
      </div>
    );
  }

  // Render grid of patient cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => renderPatientCard(patient))}
    </div>
  );
};

export default PatientsList;
