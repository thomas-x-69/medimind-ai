import React, { useState, useEffect, useRef } from "react";

const Calendar = () => {
  // State for calendar navigation
  const [currentMonth, setCurrentMonth] = useState(4); // May (0-indexed)
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedDate, setSelectedDate] = useState({
    day: 15,
    month: 4,
    year: 2024,
  });

  // State for events and UI
  const [events, setEvents] = useState({});
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDayView, setShowDayView] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "12:00",
    description: "",
    color: "#f4badd", // Default color
  });

  // Refs for handling outside clicks
  const eventModalRef = useRef(null);
  const monthPickerRef = useRef(null);
  const yearPickerRef = useRef(null);
  const dayViewRef = useRef(null);
  const monthSelectorRef = useRef(null);
  const yearSelectorRef = useRef(null);

  // ===== CALENDAR CALCULATIONS =====
  // Get days in month, accounting for leap years
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Adjust day of week to start from Monday (0) instead of Sunday (6)
  const adjustDayOfWeek = (day) => {
    return day === 0 ? 6 : day - 1; // Convert Sunday (0) to 6, and shift others by -1
  };

  // Get week number for a date
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Check if a date is today
  const isToday = (day, month, year) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Generate a date key for storing events
  const getDateKey = (year, month, day) => {
    return `${year}-${month + 1}-${day}`;
  };

  // ===== GENERATE CALENDAR DATA =====
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = adjustDayOfWeek(
      getFirstDayOfMonth(currentMonth, currentYear)
    );

    const calendar = [];
    let week = [];
    let dayCounter = 1;

    // Calculate week number for the first day of the month
    const firstDayDate = new Date(currentYear, currentMonth, 1);
    let currentWeekNumber = getWeekNumber(firstDayDate);

    // Fill in empty days at the beginning
    for (let i = 0; i < firstDayOfMonth; i++) {
      week.push(null);
    }

    // Fill in the days of the month
    while (dayCounter <= daysInMonth) {
      // If week is complete, push it to calendar and start new week
      if (week.length === 7) {
        calendar.push({
          days: [...week],
          weekNumber: currentWeekNumber,
        });
        currentWeekNumber++;
        week = [];
      }

      week.push(dayCounter);
      dayCounter++;
    }

    // Fill in empty days at the end
    while (week.length < 7 && week.length > 0) {
      week.push(null);
    }

    // Add the last week if it has any days
    if (week.length > 0) {
      calendar.push({
        days: [...week],
        weekNumber: currentWeekNumber,
      });
    }

    return calendar;
  };

  // ===== EVENT HANDLERS =====
  // Toggle month picker
  const toggleMonthPicker = (e) => {
    e.stopPropagation();
    setShowYearPicker(false);
    setShowMonthPicker(!showMonthPicker);
  };

  // Toggle year picker
  const toggleYearPicker = (e) => {
    e.stopPropagation();
    setShowMonthPicker(false);
    setShowYearPicker(!showYearPicker);
  };

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Go to current date and view today's events
  const goToToday = () => {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    setCurrentMonth(todayMonth);
    setCurrentYear(todayYear);
    setSelectedDate({
      day: todayDay,
      month: todayMonth,
      year: todayYear,
    });

    // Show today's events
    setShowDayView(true);
  };

  // Date selection handler
  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate({
        day,
        month: currentMonth,
        year: currentYear,
      });
      setShowDayView(true);
    }
  };

  // Add event handler
  const handleAddEvent = (
    day = selectedDate.day,
    month = currentMonth,
    year = currentYear
  ) => {
    setSelectedDate({
      day,
      month,
      year,
    });
    // Set a random event color
    const colors = ["#f4badd", "#a5b4fc", "#86efac", "#fcd34d", "#f87171"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setNewEvent({
      title: "",
      time: "12:00",
      description: "",
      color: randomColor,
    });
    setShowEventModal(true);
  };

  // Save event
  const saveEvent = () => {
    if (newEvent.title.trim() === "") return;

    const dateKey = getDateKey(
      selectedDate.year,
      selectedDate.month,
      selectedDate.day
    );
    const updatedEvents = { ...events };

    if (!updatedEvents[dateKey]) {
      updatedEvents[dateKey] = [];
    }

    updatedEvents[dateKey].push({
      ...newEvent,
      id: Date.now(), // Simple unique ID
    });

    setEvents(updatedEvents);
    setShowEventModal(false);
  };

  // Delete event
  const deleteEvent = (dateKey, eventId) => {
    const updatedEvents = { ...events };
    updatedEvents[dateKey] = updatedEvents[dateKey].filter(
      (event) => event.id !== eventId
    );

    if (updatedEvents[dateKey].length === 0) {
      delete updatedEvents[dateKey];
    }

    setEvents(updatedEvents);
  };

  // Select month
  const selectMonth = (month) => {
    setCurrentMonth(month);
    setShowMonthPicker(false);
  };

  // Select year
  const selectYear = (year) => {
    setCurrentYear(year);
    setShowYearPicker(false);
  };

  // ===== UTILITY FUNCTIONS =====
  // Get month name
  const getMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month];
  };

  // Determine if date is a weekend
  const isWeekend = (dayIndex) => {
    return dayIndex === 5 || dayIndex === 6; // Saturday or Sunday
  };

  // Check if a date has events
  const hasEvents = (day, month, year) => {
    const dateKey = getDateKey(year, month, day);
    return !!events[dateKey] && events[dateKey].length > 0;
  };

  // Get event count for a date
  const getEventCount = (day, month, year) => {
    const dateKey = getDateKey(year, month, day);
    return events[dateKey] ? events[dateKey].length : 0;
  };

  // Get events for a date
  const getEventsForDate = (day, month, year) => {
    const dateKey = getDateKey(year, month, day);
    return events[dateKey] || [];
  };

  // ===== SIDE EFFECTS =====
  // Handle clicks outside modals and pickers
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if we're clicking outside the respective elements
      if (
        monthPickerRef.current &&
        !monthPickerRef.current.contains(event.target) &&
        !monthSelectorRef.current.contains(event.target)
      ) {
        setShowMonthPicker(false);
      }

      if (
        yearPickerRef.current &&
        !yearPickerRef.current.contains(event.target) &&
        !yearSelectorRef.current.contains(event.target)
      ) {
        setShowYearPicker(false);
      }

      // Event modal
      if (
        showEventModal &&
        eventModalRef.current &&
        !eventModalRef.current.contains(event.target)
      ) {
        setShowEventModal(false);
      }

      // Day view
      if (
        showDayView &&
        dayViewRef.current &&
        !dayViewRef.current.contains(event.target) &&
        !event.target.closest(".calendar-day")
      ) {
        setShowDayView(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMonthPicker, showYearPicker, showEventModal, showDayView]);

  // ===== UI COMPONENTS =====
  // Render event indicators for a day
  const renderEventIndicator = (day, month, year) => {
    const count = getEventCount(day, month, year);
    if (count === 0) return null;

    // Get the actual events for this date to use their colors
    const dateKey = getDateKey(year, month, day);
    const dayEvents = events[dateKey] || [];

    return (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {dayEvents.slice(0, 3).map((event, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: event.color || "#f4badd" }}
          ></div>
        ))}
        {count > 3 && (
          <div className="text-xs font-bold" style={{ color: "#f4badd" }}>
            +{count - 3}
          </div>
        )}
      </div>
    );
  };

  // Month Picker
  const renderMonthPicker = () => {
    if (!showMonthPicker) return null;

    return (
      <div
        ref={monthPickerRef}
        className="absolute z-20 bg-white rounded-lg shadow-lg p-3 w-64 top-full left-1/2 transform -translate-x-1/2 mt-2"
      >
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 12 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => selectMonth(idx)}
              className={`
                py-2 px-3 text-sm rounded-lg transition-all duration-200
                ${
                  currentMonth === idx
                    ? "bg-[#f4badd] text-[#111111] font-medium"
                    : "hover:bg-[#ece8da] text-gray-700"
                }
              `}
            >
              {getMonthName(idx).substring(0, 3)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Year Picker
  const renderYearPicker = () => {
    if (!showYearPicker) return null;

    const years = [];
    // Show a good range of years, 10 years back and 10 years forward
    const startYear = currentYear - 10;
    const endYear = currentYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    return (
      <div
        ref={yearPickerRef}
        className="absolute z-20 bg-white rounded-lg shadow-lg p-3 w-64 top-full left-1/2 transform -translate-x-1/2 mt-2"
      >
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => {
              // Go to previous set of years
              const newStartYear = startYear - 21;
              selectYear(newStartYear + 10);
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="text-sm font-medium">
            {startYear} - {endYear}
          </span>
          <button
            onClick={() => {
              // Go to next set of years
              const newStartYear = startYear + 21;
              selectYear(newStartYear - 10);
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => selectYear(year)}
              className={`
                py-2 px-2 text-sm rounded-lg transition-all duration-200
                ${
                  currentYear === year
                    ? "bg-[#f4badd] text-[#111111] font-medium"
                    : "hover:bg-[#ece8da] text-gray-700"
                }
              `}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Event Modal
  const renderEventModal = () => {
    const eventColors = ["#f4badd", "#a5b4fc", "#86efac", "#fcd34d", "#f87171"];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
        <div
          ref={eventModalRef}
          className="bg-white rounded-lg p-4 w-full max-w-md shadow-xl"
        >
          <h2 className="text-lg font-bold mb-4">
            Add Event for {selectedDate.day} {getMonthName(selectedDate.month)}{" "}
            {selectedDate.year}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                placeholder="Add title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4badd]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4badd]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Color
              </label>
              <div className="flex space-x-2">
                {eventColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewEvent({ ...newEvent, color })}
                    className={`w-8 h-8 rounded-full ${
                      newEvent.color === color ? "ring-2 ring-gray-400" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                placeholder="Add description"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4badd]"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setShowEventModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={saveEvent}
              disabled={!newEvent.title.trim()}
              className={`
                px-4 py-2 rounded-lg
                ${
                  newEvent.title.trim()
                    ? "bg-[#111111] text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Day View Modal
  const renderDayView = () => {
    const dayEvents = getEventsForDate(
      selectedDate.day,
      selectedDate.month,
      selectedDate.year
    );
    dayEvents.sort((a, b) => a.time.localeCompare(b.time));

    const dateKey = getDateKey(
      selectedDate.year,
      selectedDate.month,
      selectedDate.day
    );
    const isSelectedDateToday = isToday(
      selectedDate.day,
      selectedDate.month,
      selectedDate.year
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 overflow-hidden">
        <div
          ref={dayViewRef}
          className="bg-white rounded-lg p-4 w-full max-w-md shadow-xl max-h-[90vh] overflow-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center">
              {selectedDate.day} {getMonthName(selectedDate.month)}{" "}
              {selectedDate.year}
              {isSelectedDateToday && (
                <span className="ml-2 text-xs bg-[#f4badd] text-[#111111] px-2 py-0.5 rounded-full">
                  Today
                </span>
              )}
            </h2>
            <button
              onClick={() => setShowDayView(false)}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {dayEvents.length > 0 ? (
            <div className="space-y-3 mb-4">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border-l-4 shadow-sm"
                  style={{
                    borderLeftColor: event.color || "#f4badd",
                    backgroundColor: `${event.color}15` || "#f4badd15",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">{event.title}</span>
                    <span className="text-sm bg-white px-2 py-1 rounded-lg">
                      {event.time}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-2">
                      {event.description}
                    </p>
                  )}
                  <button
                    onClick={() => deleteEvent(dateKey, event.id)}
                    className="text-sm text-red-500 hover:text-red-700 mt-3 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-2 text-gray-300"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              No events scheduled for this day.
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={() => {
                setShowDayView(false);
                handleAddEvent(
                  selectedDate.day,
                  selectedDate.month,
                  selectedDate.year
                );
              }}
              className="bg-[#111111] text-white px-4 py-2 rounded-lg hover:bg-gray-800 w-full"
            >
              Add Event
            </button>
          </div>
        </div>
      </div>
    );
  };

  // "Today" banner that appears at the top when not on today's date
  const renderTodayBanner = () => {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    // Only show banner if we're not already on today's month/year
    if (currentMonth === todayMonth && currentYear === todayYear) {
      return null;
    }

    return (
      <div className="mb-2 bg-[#fffcef] rounded-lg p-2 flex items-center justify-between">
        <span className="text-sm text-gray-700">Jump to today's events</span>
        <button
          onClick={goToToday}
          className="text-xs bg-[#f4badd] text-[#111111] px-2 py-1 rounded-full hover:bg-pink-300"
        >
          Today
        </button>
      </div>
    );
  };

  // ===== MAIN RENDER =====
  const calendarData = generateCalendar();

  return (
    <div className="bg-[#ece8da] p-6 rounded-xl w-full max-w-sm">
      {/* Today Banner */}
      {renderTodayBanner()}

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="text-[#111111] w-8 h-8 flex items-center justify-center hover:bg-[#fffcef] rounded-full transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="relative">
          <div className="bg-[#f4badd] text-[#111111] px-8 py-1.5 rounded-full font-medium text-sm flex items-center space-x-2">
            <button
              ref={monthSelectorRef}
              onClick={toggleMonthPicker}
              className="focus:outline-none focus:underline hover:underline"
            >
              {getMonthName(currentMonth)}
            </button>
            <button
              ref={yearSelectorRef}
              onClick={toggleYearPicker}
              className="focus:outline-none focus:underline hover:underline"
            >
              {currentYear}
            </button>
          </div>

          {renderMonthPicker()}
          {renderYearPicker()}
        </div>

        <button
          onClick={handleNextMonth}
          className="text-[#111111] w-8 h-8 flex items-center justify-center hover:bg-[#fffcef] rounded-full transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 mb-2">
        {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((day, index) => (
          <div
            key={index}
            className="text-center text-[#111111] text-sm font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="space-y-4">
        {calendarData.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="grid grid-cols-7 relative items-center"
          >
            {week.days.map((day, dayIndex) => (
              <div key={dayIndex} className="relative">
                {day ? (
                  <button
                    className={`
                      calendar-day w-10 h-10 flex items-center justify-center text-center rounded-full text-sm relative
                      ${
                        isToday(day, currentMonth, currentYear)
                          ? "font-bold ring-2 ring-[#f4badd]"
                          : ""
                      }
                      ${
                        selectedDate.day === day &&
                        selectedDate.month === currentMonth &&
                        selectedDate.year === currentYear
                          ? "bg-[#f4badd] text-[#111111]"
                          : ""
                      }
                      ${
                        isWeekend(dayIndex) &&
                        !(
                          selectedDate.day === day &&
                          selectedDate.month === currentMonth &&
                          selectedDate.year === currentYear
                        )
                          ? "text-gray-400"
                          : "text-[#111111]"
                      }
                      hover:bg-[#fffcef] relative
                      ${hasEvents(day, currentMonth, currentYear) ? "mb-2" : ""}
                    `}
                    onClick={() => handleDateClick(day)}
                  >
                    {day}
                    {renderEventIndicator(day, currentMonth, currentYear)}
                  </button>
                ) : (
                  <div className="w-10 h-10"></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Single Full-Width Add Event Button */}
      <div className="mt-8">
        <button
          onClick={() => handleAddEvent()}
          className="bg-[#111111] text-white py-3 px-6 rounded-full w-full text-center text-sm font-medium flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add event
        </button>
      </div>

      {/* Modals */}
      {showEventModal && renderEventModal()}
      {showDayView && renderDayView()}
    </div>
  );
};

export default Calendar;
