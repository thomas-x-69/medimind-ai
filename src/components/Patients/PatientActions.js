import React, { useState } from "react";
import Button from "@/components/ui/Button";

const PatientActions = ({
  searchTerm,
  setSearchTerm,
  searchInputRef,
  openModal,
  viewMode,
  setViewMode,
  filteredCount,
  totalCount,
  handleSort,
  sortConfig,
  fadeInClass,
}) => {
  const [showSortOptions, setShowSortOptions] = useState(false);

  // Sort options
  const sortOptions = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "lastChecked", label: "Last Visit" },
    { key: "status", label: "Status" },
  ];

  return (
    <div
      className={`bg-white rounded-xl p-4 shadow-sm ${fadeInClass} transition-all duration-500`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-2">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#5669FF] focus:border-[#5669FF] text-sm"
            placeholder="Search patients by name, ID or symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={searchInputRef}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
              onClick={() => setSearchTerm("")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {/* View mode toggle & sort */}
        <div className="flex items-center space-x-2">
          {/* Results count */}
          <div className="text-sm text-gray-500 mr-2 hidden sm:block">
            {filteredCount} of {totalCount} patients
          </div>

          {/* View mode toggle */}
          <div className="bg-gray-100 rounded-lg flex">
            <button
              className={`p-2 rounded-l-lg ${
                viewMode === "grid"
                  ? "bg-[#5669FF] text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              className={`p-2 rounded-r-lg ${
                viewMode === "list"
                  ? "bg-[#5669FF] text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              onClick={() => setShowSortOptions(!showSortOptions)}
              title="Sort options"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="21" y1="10" x2="3" y2="10"></line>
                <line x1="21" y1="6" x2="9" y2="6"></line>
                <line x1="21" y1="14" x2="9" y2="14"></line>
                <line x1="21" y1="18" x2="3" y2="18"></line>
              </svg>
            </button>

            {showSortOptions && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  <div className="px-4 py-2 text-xs text-gray-500 uppercase font-medium">
                    Sort by
                  </div>
                  {sortOptions.map((option) => (
                    <button
                      key={option.key}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex justify-between items-center ${
                        sortConfig.key === option.key ? "font-medium" : ""
                      }`}
                      onClick={() => {
                        handleSort(option.key);
                        setShowSortOptions(false);
                      }}
                    >
                      {option.label}
                      {sortConfig.key === option.key && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`transform ${
                            sortConfig.direction === "ascending"
                              ? ""
                              : "rotate-180"
                          }`}
                        >
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add patient button */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => openModal("addPatient")}
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            }
          >
            Add Patient
          </Button>
        </div>
      </div>

      {/* Mobile results count */}
      <div className="text-sm text-gray-500 mt-2 sm:hidden">
        {filteredCount} of {totalCount} patients
      </div>
    </div>
  );
};

export default PatientActions;
