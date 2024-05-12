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

export const formatDateYYYYMMDD = (date?: Date) => {
  //2022-01-01 format
  const originDate = date ? date : new Date();

  const year = originDate.getFullYear();
  const month = String(originDate.getMonth() + 1).padStart(2, "0");
  const day = String(originDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const checkUserAgent = () => {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    return "Android";
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    return "iPhone";
  } else {
    return "PC";
  }
};

export const getDateRangeArray = (daysInterval: number) => {
  //daysInteval represent +- days from current date
  const currentDate = new Date();
  const dateRange = [];

  for (let i = -daysInterval; i <= daysInterval; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    dateRange.push(date.toISOString().split("T")[0]);
  }

  return dateRange;
};
export const joinTwoArray = (
  arr1: any[],
  arr2: any[],
  key1: string,
  key2: string
) => {
  return arr1.map((item1) => {
    const item2 = arr2.find((item) => item[key1] === item1[key2]);
    return { ...item1, ...item2 };
  });
};
export function groupByDate(data: any) {
  return data.reduce((acc: any, obj: any) => {
    // Use the date as the key for the groups
    const key = obj.date;
    // If the key doesn't exist yet, create it
    if (!acc[key]) {
      acc[key] = [];
    }
    // Push the current object into the correct date group
    acc[key].push(obj);
    return acc;
  }, {});
}
