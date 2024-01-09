export const dateFormatter = (dateString: string) => {
  const startDate = new Date(dateString);

  const formattedDate =
    String(startDate && startDate.getFullYear()).padStart(2, '0') +
    '.' +
    String(startDate && startDate.getMonth() + 1).padStart(2, '0') +
    '.' +
    String(startDate && startDate.getDate()).padStart(2, '0');

  return formattedDate;
};

const roundDateToDay = (date: string) => {
  const roundedDate = new Date(date);
  roundedDate.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
  return roundedDate;
};

export const dateDifference = (startDate: string, endDate: string) => {
  const roundedStartDate = roundDateToDay(startDate);
  const roundedEndDate = roundDateToDay(endDate);

  const dateArray = [];
  let currentDate = new Date(roundedStartDate);

  while (currentDate <= roundedEndDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
};
