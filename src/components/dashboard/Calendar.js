import React from "react";
import { MdArrowBack, MdArrowForward, MdOutlineRefresh } from "react-icons/md";

const Calendar = () => {
  // Static data to match the design
  const currentMonth = "May 2024";
  const weekDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  const selectedDay = 15; // Highlighted day in the mock
  const dates = Array.from({ length: 31 }, (_, i) => i + 1); // 1-31 for the month

  // This week's dates - for display
  const currentWeekDates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  // Group dates into weeks for the grid
  const weeks = [];
  for (let i = 0; i < currentWeekDates.length; i += 7) {
    weeks.push(currentWeekDates.slice(i, i + 7));
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm">
          <MdArrowBack className="text-gray-600" />
        </button>

        <h2 className="text-sm font-medium bg-pink-200 px-5 py-1 rounded-full">
          {currentMonth}
        </h2>

        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm">
          <MdArrowForward className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 text-center mb-4">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center">
            <p className="text-xs text-gray-500">{day}</p>
          </div>
        ))}

        {/* First week */}
        {weeks[0].map((date, index) => (
          <div key={index} className="text-center">
            <button
              className={`w-8 h-8 flex items-center justify-center rounded-full mx-auto ${
                date === selectedDay
                  ? "bg-[#5669FF] text-white"
                  : date === 15 + 1 || date === 15 - 1
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              {date}
            </button>
            {date === selectedDay && (
              <div className="w-1 h-1 bg-[#5669FF] rounded-full mx-auto mt-1"></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Show all ...</p>
        <button className="flex items-center text-sm text-[#5669FF]">
          <MdOutlineRefresh className="mr-1" />
          Refresh
        </button>
      </div>

      {/* Add event button */}
      <div className="mt-6 flex justify-center">
        <button className="bg-black text-white py-3 px-6 rounded-full text-sm font-medium w-full max-w-xs">
          Add event
        </button>
      </div>

      {/* May 15 section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">May 15</h3>

        <div className="flex items-center justify-between mb-2">
          <div className="text-sm">Time</div>
          <button className="flex items-center bg-black text-white text-xs py-1 px-3 rounded-full">
            All <span className="ml-1">▼</span>
          </button>
        </div>

        {/* Timeline entries */}
        <div className="mt-4 relative">
          {/* Timeline items with time markers */}
          <div className="relative border-l border-gray-200 pl-8 ml-4">
            {/* Time marker */}
            <div className="absolute -left-2 mt-2 text-xs text-gray-500">
              07:00
            </div>

            {/* Emergency visit entry */}
            <div className="mb-8 relative">
              <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-pink-300 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="bg-pink-100 rounded-full p-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#FF5454"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 12H16"
                        stroke="#FF5454"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 8V16"
                        stroke="#FF5454"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Emergency visit</h4>
                    <p className="text-xs text-gray-500">West camp, Room 312</p>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">07:00 - 07:30</div>
              </div>
            </div>

            {/* Time marker */}
            <div className="absolute -left-2 mt-0 text-xs text-gray-500">
              07:30
            </div>

            {/* Diagnostic test entry */}
            <div className="mb-8 mt-4 relative">
              <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-blue-300 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 rounded-full p-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 12H2"
                        stroke="#5669FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 2V22"
                        stroke="#5669FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Diagnostic test</h4>
                    <p className="text-xs text-gray-500">
                      East camp, Laboratory, floor 5
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">07:30 - 07:55</div>
              </div>
            </div>

            {/* More timeline entries can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
