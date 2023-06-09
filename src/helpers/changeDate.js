import dateFormat from "dateformat";

export const changeDate = (due_date) => {
  // Convert the due_date string to a Date object using the parseDate function.
  const dueDateToDate = parseDate(due_date);

  // Format the Date object into a string in the mmmm dd, yyyy format using the dateFormat function.
  return dateFormat(dueDateToDate, "mmmm dd, yyyy");
};

export const changeDateToApiFormat = (date) => {
  return dateFormat(date, "yyyy-mm-dd");
};

// Export a function called parseDate that takes a date string as its argument and returns a Date object.
export const parseDate = (date) => {
  // Split the date string into parts using the - character as a delimiter.
  let parts = date.split("-");
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  // The month is zero-indexed, so we need to subtract 1 from it.
  return new Date(parts[0], parts[1] - 1, parts[2]);
};
