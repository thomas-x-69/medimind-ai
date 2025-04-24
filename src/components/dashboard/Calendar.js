import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw, Plus } from "lucide-react";

const Calendar = ({ isLoaded = false, openModal }) => {
  const [currentMonth, setCurrentMonth] = useState("May 2024");
  const [selectedDay, setSelectedDay] = useState(15);
  const [timelineView, setTimelineView] = useState("All");

  // Week days display
  const weekDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  // Events for the timeline
  const events = [
    {
      time: "07:00",
      icon: "heart",
      color: "pink",
      title: "Emergency visit",
      location: "West camp, Room 312",
      duration: "07:00 - 07:30",
    },
    {
      time: "07:30",
      icon: "file",
      color: "blue",
      title: "Diagnostic test",
      location: "East camp, Laboratory, floor 5",
      duration: "07:30 - 07:55",
    },
    {
      time: "08:00",
      icon: "team",
      color: "amber",
      title: "Team daily planning",
      location: "East camp, Room 200",
      duration: "08:00 - 09:00",
      hasParticipants: true,
      participants: ["TY", "JB", "NR", "TS", "SE"],
    },
    {
      time: "09:00",
      icon: "heart",
      color: "pink",
      title: "Emergency visit",
      location: "West camp, Room 312",
      duration: "09:00 - 09:30",
    },
  ];

  // Generate days for the calendar
  const generateCalendarDays = () => {
    const days = [];
    // Start week days at 1
    for (let i = 1; i <= 31; i++) {
      const isWeekend = (i + 2) % 7 >= 5; // Assuming 1st of month is Monday
      const hasEvent = [3, 8, 15, 22, 27].includes(i);
      const isSelected = i === selectedDay;

      days.push({ day: i, isWeekend, hasEvent, isSelected });
    }
    return days;
  };

  const days = generateCalendarDays();
  const week1 = days.slice(0, 7);

  const getEventIcon = (iconType, color) => {
    if (iconType === "heart") {
      return (
        <div
          className={`bg-${
            color === "pink" ? "pink" : "blue"
          }-100 p-2 rounded-full`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke={color === "pink" ? "#FF5454" : "#5669FF"}
              strokeWidth="2"
            />
            <path
              d="M8 12H16"
              stroke={color === "pink" ? "#FF5454" : "#5669FF"}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 8V16"
              stroke={color === "pink" ? "#FF5454" : "#5669FF"}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    } else if (iconType === "file") {
      return (
        <div className="bg-blue-100 p-2 rounded-full">
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
      );
    } else if (iconType === "team") {
      return (
        <div className="bg-amber-100 p-2 rounded-full">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
              stroke="#FFB800"
              strokeWidth="2"
            />
            <circle cx="9" cy="7" r="4" stroke="#FFB800" strokeWidth="2" />
            <path
              d="M23 21v-2a4 4 0 0 0-3-3.87"
              stroke="#FFB800"
              strokeWidth="2"
            />
            <path
              d="M16 3.13a4 4 0 0 1 0 7.75"
              stroke="#FFB800"
              strokeWidth="2"
            />
          </svg>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-6">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-100 transition-all duration-300">
          <ChevronLeft className="text-gray-600" size={20} />
        </button>

        <h2 className="text-sm font-medium bg-pink-200 px-5 py-1 rounded-full">
          {currentMonth}
        </h2>

        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-100 transition-all duration-300">
          <ChevronRight className="text-gray-600" size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 text-center mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-xs text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4 text-center mb-4">
        {week1.map((day, index) => (
          <div key={index} className="text-center">
            <button
              className={`w-8 h-8 flex items-center justify-center rounded-full mx-auto ${
                day.isSelected
                  ? "bg-[#5669FF] text-white"
                  : day.day === selectedDay + 1 || day.day === selectedDay - 1
                  ? "bg-gray-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedDay(day.day)}
            >
              {day.day}
            </button>
            {day.isSelected && (
              <div className="w-1 h-1 bg-[#5669FF] rounded-full mx-auto mt-1"></div>
            )}
            {day.hasEvent && !day.isSelected && (
              <div className="w-1 h-1 bg-pink-500 rounded-full mx-auto mt-1"></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-2 mb-4">
        <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-300">
          Show all ...
        </p>
        <button className="flex items-center text-sm text-[#5669FF] hover:text-blue-700 transition-colors duration-300">
          <RefreshCw className="mr-1" size={14} />
          Refresh
        </button>
      </div>

      {/* Add event button */}
      <div className="mt-2 mb-6">
        <button
          className="bg-black text-white py-3 px-6 rounded-full text-sm font-medium w-full hover:bg-gray-800 transition-colors duration-300"
          onClick={() => openModal && openModal("add-event")}
        >
          <Plus size={16} className="inline mr-2" />
          Add event
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2 flex justify-between items-center">
          <span>May {selectedDay}</span>
          <button className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full hover:bg-pink-600 transition-colors duration-300">
            Today
          </button>
        </h3>

        <div className="flex justify-between items-center mt-2 mb-4">
          <div className="text-sm">Time</div>
          <button className="flex items-center bg-black text-white text-xs py-1 px-3 rounded-full">
            {timelineView} <span className="ml-1">▼</span>
          </button>
        </div>

        <div className="space-y-6">
          {events.map((event, idx) => (
            <div key={`${event.time}-${idx}`} className="group">
              <div className="text-sm text-gray-500 mb-2">{event.time}</div>
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <div className="flex items-center gap-2">
                  {getEventIcon(event.icon, event.color)}
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-xs text-gray-500">{event.location}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {event.duration}
                </div>

                {event.hasParticipants && (
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 mb-1">
                      Participants
                    </div>
                    <div className="flex space-x-1">
                      {event.participants.map((initials, i) => (
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
                          } text-white w-5 h-5 rounded-full flex items-center justify-center text-xs`}
                        >
                          {initials}
                        </div>
                      ))}
                      <div className="bg-gray-300 text-gray-500 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        +3
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
