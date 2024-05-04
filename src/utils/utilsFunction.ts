export const convertToDateString = (timestamp: string) => {
  // Create a new Date object from the timestamp
  const date = new Date(timestamp);

  // Extract the date components
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
  const day = ("0" + date.getDate()).slice(-2);

  // Concatenate the components into the date string
  const dateString = year + "-" + month + "-" + day;

  return dateString;
};
