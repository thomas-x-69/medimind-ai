import { format, startOfWeek, addDays, isSameDay, parseISO } from "date-fns";

// Format date as "May 2024"
export const formatMonthYear = (date) => {
  return format(date, "MMMM yyyy");
};

// Format time as "07:30"
export const formatTime = (timeString) => {
  return timeString;
};

// Get current week days for calendar
export const getCurrentWeekDays = () => {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 }); // Start from Monday

  return Array.from({ length: 7 }).map((_, index) => {
    const day = addDays(start, index);
    return {
      date: day,
      dayName: format(day, "EE").toUpperCase(), // MO, TU, WE...
      dayNumber: format(day, "d"),
      isToday: isSameDay(day, now),
    };
  });
};

// Format date as "23 April 2021"
export const formatFullDate = (dateString) => {
  if (!dateString) return "";
  const date =
    typeof dateString === "string" ? parseISO(dateString) : dateString;
  return format(date, "dd MMMM yyyy");
};

// Format appointment time slots
export const formatTimeSlot = (startTime, endTime) => {
  if (!startTime || !endTime) return "";
  return `${startTime} - ${endTime}`;
};
