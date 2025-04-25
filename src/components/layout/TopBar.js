import React from "react";

const TopBar = ({
  isLoaded,
  fadeInClass,
  isDarkMode,
  setIsDarkMode,
  searchValue,
  setSearchValue,
  isSearching,
  setIsSearching,
  searchInputRef,
  activeTags = [], // Add default empty array here
  toggleTag = () => {}, // Add default empty function
  liveTimeUpdate,
  pendingAlert,
  nextPatientTimer,
  showNotification,
  openModal,
}) => {
  return (
    <div
      className={`px-6 py-4 flex items-center justify-between transition-all duration-500 ${fadeInClass} ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-amber-50"
      }`}
    >
      <div className="flex items-center group">
        <div
          onClick={() => searchInputRef.current?.focus()}
          className={`${
            isSearching ? "bg-pink-400 text-white" : "bg-pink-100 text-gray-600"
          } rounded-full p-2 group-hover:bg-pink-200 transition-colors duration-300 cursor-pointer`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsSearching(true)}
          onBlur={() => setIsSearching(false)}
          placeholder="Search patients, events..."
          className={`bg-transparent border-none outline-none ml-2 text-sm transition-all duration-300 ${
            isDarkMode
              ? "placeholder-gray-400 text-white"
              : "placeholder-gray-500 text-gray-800"
          } ${isSearching ? "w-64" : "w-24"}`}
        />

        <div className="ml-6 flex items-center space-x-2 text-sm">
          <span className="text-gray-500">In:</span>
          {["Patients", "Education", "Prescriptions", "Test results"].map(
            (tag) => (
              <span
                key={tag}
                className={`${
                  activeTags.includes(tag)
                    ? "bg-black text-white"
                    : "border border-gray-300 text-gray-500"
                } rounded-full px-3 py-0.5 text-xs cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition-all duration-300`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Mode toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isDarkMode ? "Light" : "Dark"}
        </button>

        {/* Live Time */}
        <div className="text-sm font-medium">{liveTimeUpdate}</div>

        {/* Next patient timer */}
        {pendingAlert && (
          <div className="flex items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              className="mr-1 animate-pulse"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span className="text-xs font-medium text-amber-500">
              Next patient in {nextPatientTimer}m
            </span>
          </div>
        )}

        {/* Icon buttons */}
        <div className="flex space-x-2">
          <div
            className={`relative rounded-full ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-black hover:bg-gray-800"
            } w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-300 group`}
            onClick={() => openModal("profile")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {showNotification && (
              <span className="absolute -top-1 -right-1 bg-pink-500 rounded-full w-3 h-3 animate-ping"></span>
            )}

            {/* Tooltip */}
            <div className="absolute top-full mt-1 right-0 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Profile (Dr. Olivia)
            </div>
          </div>

          <div
            className="relative rounded-full bg-black w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors duration-300 group"
            onClick={() => openModal("notifications")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="absolute -top-1 -right-1 bg-pink-500 rounded-full w-3 h-3"></span>

            {/* Tooltip */}
            <div className="absolute top-full mt-1 right-0 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Notifications
            </div>
          </div>

          <div
            className="rounded-full bg-black w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors duration-300 group"
            onClick={() => openModal("settings")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>

            {/* Tooltip */}
            <div className="absolute top-full mt-1 right-0 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Settings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
