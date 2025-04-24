import React from "react";

const Calendar = ({
  isLoaded,
  isDarkMode,
  currentMonth,
  days,
  events,
  timelineView,
  setTimelineView,
  setShowToast,
  setToastMessage,
  openModal,
}) => {
  // Calendar styling
  const translateClass = isLoaded ? "translate-x-0" : "translate-x-full";

  return (
    <div
      className={`w-72 flex flex-col transition-all duration-500 ${translateClass} ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        <button className="text-gray-600 hover:text-gray-800 transition-colors duration-300 transform hover:scale-110">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className="bg-pink-200 px-3 py-1 rounded-full text-sm animate-pulse">
          {currentMonth}
        </div>
        <button className="text-gray-600 hover:text-gray-800 transition-colors duration-300 transform hover:scale-110">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div className="px-4 pt-2">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {days.map((day) => (
            <div key={day} className="text-xs text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {[...Array(35)].map((_, idx) => {
            // Calendar calculation logic
            const day = idx + 1;
            const isWeekend = idx % 7 >= 5;
            const isCurrentMonth = day <= 31;
            const isSelected = day === 15 && isCurrentMonth;
            const hasEvent = [3, 8, 15, 22, 27].includes(day) && isCurrentMonth;

            return (
              <div
                key={idx}
                className={`
                  relative
                  ${
                    isSelected
                      ? "bg-pink-500 text-white"
                      : isWeekend
                      ? "text-gray-400"
                      : isCurrentMonth
                      ? ""
                      : "text-gray-300"
                  } 
                  ${
                    isSelected
                      ? "w-6 h-6 rounded-full flex items-center justify-center"
                      : "p-1"
                  } 
                  transition-all duration-300 hover:bg-gray-200 cursor-pointer
                  ${isLoaded ? "opacity-100" : "opacity-0"}
                `}
                style={{ transitionDelay: `${0.01 * idx}s` }}
                onClick={() => {
                  if (isCurrentMonth) {
                    setShowToast(true);
                    setToastMessage(`Selected date: May ${day}, 2024`);
                    setTimeout(() => setShowToast(false), 2000);
                  }
                }}
              >
                {isCurrentMonth ? day : day - 31}

                {/* Event indicator */}
                {hasEvent && !isSelected && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 pt-4">
        <button
          onClick={() => openModal("add-event")}
          className="w-full bg-black text-white rounded-xl py-3 font-medium flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 transform hover:scale-[1.02]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mr-2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add event
        </button>
      </div>

      <div className="px-4 pt-6">
        <h3 className="font-bold text-xl flex justify-between items-center">
          <span>May 15</span>
          <button className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full hover:bg-pink-600 transition-colors duration-300">
            Today
          </button>
        </h3>

        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-gray-500">Time</div>
          <div className="text-sm">Today's timeline</div>
          <div className="bg-black text-white px-2 py-1 rounded-full text-xs flex items-center hover:bg-gray-800 transition-colors duration-300 cursor-pointer group">
            {timelineView}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="ml-1"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-1 top-full bg-white shadow-lg rounded-lg overflow-hidden z-50 transform scale-0 group-hover:scale-100 transition-transform duration-200 origin-top-right">
              {["All", "Emergencies", "Meetings", "Tests"].map((option) => (
                <div
                  key={option}
                  className="px-3 py-1 hover:bg-gray-100 text-black text-xs cursor-pointer transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimelineView(option);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-6">
          {events.map((event, idx) => (
            <div
              key={`${event.time}-${idx}`}
              className={`transition-all duration-700 transform ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${0.1 * (idx + 1)}s` }}
            >
              <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
                <span>{event.time}</span>
                <div className="text-xs bg-gray-200 px-1.5 py-0.5 rounded text-gray-500 hover:bg-gray-300 transition-colors duration-300 cursor-pointer">
                  {idx * 15 + 5}m
                </div>
              </div>
              <div className="flex items-start group">
                <div
                  className={`bg-${event.color}-100 p-2 rounded-full mr-3 group-hover:scale-110 transition-all duration-300 cursor-pointer`}
                >
                  {event.icon === "heart" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  )}
                  {event.icon === "file" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="gray"
                      strokeWidth="2"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  )}
                  {event.icon === "team" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )}
                </div>
                <div className="group-hover:translate-x-1 transition-transform duration-300 flex-1">
                  <div className="font-medium flex justify-between items-center">
                    <span>{event.title}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-1">
                      <button className="text-gray-500 hover:text-gray-700 transition-colors duration-300">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-red-500 transition-colors duration-300">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{event.location}</div>
                  {event.duration && (
                    <div className="text-xs text-gray-500 mt-1">
                      {event.duration}
                    </div>
                  )}
                </div>
              </div>

              {event.hasParticipants && (
                <div className="ml-10 mt-1 pb-2">
                  <div className="text-xs text-gray-500 mb-1">Participants</div>
                  <div className="flex space-x-1">
                    {["TY", "JB", "NR", "TS", "SE"].map((initials, i) => (
                      <div
                        key={initials}
                        className={`${
                          i === 0
                            ? "bg-blue-400"
                            : i === 1
                            ? "bg-green-400"
                            : i === 2
                            ? "bg-gray-400"
                            : i === 3
                            ? "bg-pink-400"
                            : "bg-red-400"
                        } text-white w-5 h-5 rounded-full flex items-center justify-center text-xs transition-transform duration-300 hover:scale-125 cursor-pointer`}
                        style={{ transitionDelay: `${0.05 * i}s` }}
                      >
                        {initials}
                      </div>
                    ))}
                    <div
                      className="bg-gray-300 text-gray-500 w-5 h-5 rounded-full flex items-center justify-center text-xs cursor-pointer transition-transform duration-300 hover:scale-125"
                      onClick={() => openModal("participants")}
                    >
                      +3
                    </div>
                  </div>
                </div>
              )}

              {idx === 2 && (
                <div className="ml-10 text-xs text-gray-500 pb-4 border-b border-dashed border-gray-300">
                  {event.duration}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto px-4 pb-4">
        <button
          onClick={() => openModal("view-all")}
          className="w-full bg-black text-white rounded-xl py-3 font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-[1.02]"
        >
          View all details
        </button>
      </div>
    </div>
  );
};

export default Calendar;
