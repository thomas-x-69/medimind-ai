import React, { useState } from "react";
import Button from "@/components/ui/Button";

const PatientFilterSidebar = ({
  activeFilters,
  toggleFilter,
  clearFilters,
  patientMetrics,
  isLoaded,
  fadeInClass,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Filter sections with their options
  const filterSections = [
    {
      id: "status",
      title: "Status",
      options: [
        { value: "stable", label: "Stable", color: "bg-green-500" },
        { value: "fair", label: "Fair", color: "bg-amber-500" },
        { value: "critical", label: "Critical", color: "bg-red-500" },
      ],
    },
    {
      id: "gender",
      title: "Gender",
      options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" },
      ],
    },
    {
      id: "visitType",
      title: "Visit Type",
      options: [
        { value: "emergency", label: "Emergency" },
        { value: "routine", label: "Routine Check-Up" },
        { value: "video", label: "Video Consultation" },
        { value: "report", label: "Report Follow-Up" },
      ],
    },
  ];

  // Get total active filters count
  const getTotalActiveFilters = () => {
    return Object.values(activeFilters).reduce(
      (sum, filters) => sum + filters.length,
      0
    );
  };

  // Handle clear all filters
  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-72"
      } bg-white border-r border-gray-200 h-full transition-all duration-300 overflow-hidden flex flex-col ${fadeInClass}`}
    >
      {/* Toggle button */}
      <button
        className="absolute -right-3 top-24 bg-white text-gray-600 w-6 h-12 rounded-r flex items-center justify-center shadow-md hover:bg-gray-50 transition-transform duration-300 hover:scale-105 z-20"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        )}
      </button>

      {/* Sidebar header */}
      <div className="p-4 border-b">
        <h2
          className={`font-bold text-xl ${
            isCollapsed ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        >
          Filters
        </h2>

        {/* Only show in expanded view */}
        {!isCollapsed && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {getTotalActiveFilters()} active filters
            </span>

            {getTotalActiveFilters() > 0 && (
              <button
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                onClick={handleClearFilters}
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Filter sections - only show in expanded view */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {filterSections.map((section) => (
            <div key={section.id}>
              <h3 className="font-medium mb-2">{section.title}</h3>
              <div className="space-y-2">
                {section.options.map((option) => {
                  const isActive = activeFilters[section.id].includes(
                    option.value
                  );

                  return (
                    <div
                      key={option.value}
                      className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                        isActive
                          ? "bg-[#5669FF] bg-opacity-10"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleFilter(section.id, option.value)}
                    >
                      <div className="flex items-center flex-1">
                        {/* Color indicator for status filters */}
                        {section.id === "status" && (
                          <span
                            className={`w-2 h-2 rounded-full mr-2 ${option.color}`}
                          ></span>
                        )}
                        <span className={`${isActive ? "font-medium" : ""}`}>
                          {option.label}
                        </span>
                      </div>

                      {/* Checkbox */}
                      <div
                        className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${
                          isActive
                            ? "border-[#5669FF] bg-[#5669FF] text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {isActive && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Patient statistics dashboard */}
          <div className="bg-gray-50 rounded-xl p-4 mt-6">
            <h3 className="font-medium mb-3 text-gray-700">Patient Overview</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total Patients</span>
                <span className="font-medium">{patientMetrics.total}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">New Today</span>
                <span className="font-medium">
                  {patientMetrics.newToday}{" "}
                  <span className="text-green-500 text-xs">+3</span>
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Scheduled</span>
                <span className="font-medium">{patientMetrics.scheduled}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Urgent Cases</span>
                <span className="font-medium text-red-600">
                  {patientMetrics.urgent}
                </span>
              </div>

              <div className="h-px bg-gray-200 my-3"></div>

              {/* Gender distribution */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500">Gender</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div
                    className="h-2 rounded-l-full bg-blue-500"
                    style={{
                      width: `${
                        (patientMetrics.byGender.male / patientMetrics.total) *
                        100
                      }%`,
                    }}
                  ></div>
                  <div
                    className="h-2 bg-pink-500"
                    style={{
                      width: `${
                        (patientMetrics.byGender.female /
                          patientMetrics.total) *
                        100
                      }%`,
                    }}
                  ></div>
                  <div
                    className="h-2 rounded-r-full bg-gray-500"
                    style={{
                      width: `${
                        (patientMetrics.byGender.other / patientMetrics.total) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="flex text-xs text-gray-500 mt-1 justify-between">
                  <span>Male: {patientMetrics.byGender.male}</span>
                  <span>Female: {patientMetrics.byGender.female}</span>
                  <span>Other: {patientMetrics.byGender.other}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick filters - only show in collapsed view */}
      {isCollapsed && (
        <div className="flex flex-col items-center p-2 space-y-4 mt-4">
          <div className="tooltip-container">
            <button
              className={`p-2 rounded-full ${
                activeFilters.status.includes("critical")
                  ? "bg-red-100 text-red-600"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
              onClick={() => toggleFilter("status", "critical")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </button>
            <span className="tooltip">Critical</span>
          </div>

          <div className="tooltip-container">
            <button
              className={`p-2 rounded-full ${
                activeFilters.visitType.includes("emergency")
                  ? "bg-red-100 text-red-600"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
              onClick={() => toggleFilter("visitType", "emergency")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="17 18 11 12 17 6"></polyline>
                <polyline points="11 18 5 12 11 6"></polyline>
              </svg>
            </button>
            <span className="tooltip">Emergency</span>
          </div>

          <div className="tooltip-container">
            <button
              className={`p-2 rounded-full ${
                activeFilters.gender.includes("Male")
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
              onClick={() => toggleFilter("gender", "Male")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 19.94 8.21 13.94 15.79 13.94 15.79 19.94"></polyline>
                <line x1="12" y1="21.94" x2="12" y2="13.94"></line>
              </svg>
            </button>
            <span className="tooltip">Male</span>
          </div>

          <div className="tooltip-container">
            <button
              className={`p-2 rounded-full ${
                activeFilters.gender.includes("Female")
                  ? "bg-pink-100 text-pink-600"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
              onClick={() => toggleFilter("gender", "Female")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="7"></circle>
                <line x1="12" y1="21" x2="12" y2="15"></line>
                <line x1="9" y1="18" x2="15" y2="18"></line>
              </svg>
            </button>
            <span className="tooltip">Female</span>
          </div>

          {getTotalActiveFilters() > 0 && (
            <div className="tooltip-container">
              <button
                className="p-2 rounded-full text-gray-400 hover:bg-gray-100"
                onClick={handleClearFilters}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <span className="tooltip">Clear all</span>
            </div>
          )}
        </div>
      )}

      {/* Sidebar footer with filter count */}
      {isCollapsed && getTotalActiveFilters() > 0 && (
        <div className="mt-auto mb-4 flex justify-center">
          <div className="bg-[#5669FF] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
            {getTotalActiveFilters()}
          </div>
        </div>
      )}

      {/* Custom tooltip styles */}
      <style jsx>{`
        .tooltip-container {
          position: relative;
        }

        .tooltip {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          background-color: #333;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          margin-left: 10px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
        }

        .tooltip-container:hover .tooltip {
          opacity: 1;
        }

        .tooltip:before {
          content: "";
          position: absolute;
          top: 50%;
          right: 100%;
          margin-top: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent #333 transparent transparent;
        }
      `}</style>
    </div>
  );
};

export default PatientFilterSidebar;
