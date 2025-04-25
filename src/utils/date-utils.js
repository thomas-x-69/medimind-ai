import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  parseISO,
  isValid,
} from "date-fns";

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
  // Return empty string for undefined, null, or empty string
  if (!dateString) return "";

  try {
    let date;
    if (typeof dateString === "string") {
      // Try to parse the string as a date
      date = parseISO(dateString);
      // Check if parsing was successful
      if (!isValid(date)) {
        // Try creating a date directly as fallback
        date = new Date(dateString);
        if (!isValid(date)) {
          return "Invalid date";
        }
      }
    } else if (dateString instanceof Date) {
      // If it's already a Date object, use it directly
      date = dateString;
      // Check if it's a valid Date object
      if (!isValid(date)) {
        return "Invalid date";
      }
    } else {
      // Not a string or Date object
      return "Invalid date format";
    }

    // Now we have a valid date, format it
    return format(date, "dd MMMM yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date formatting error";
  }
};

// Format appointment time slots
export const formatTimeSlot = (startTime, endTime) => {
  if (!startTime || !endTime) return "";
  return `${startTime} - ${endTime}`;
};
