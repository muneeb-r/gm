export function getMonthName(monthNum) {
  const months = [
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
    "December"
  ];

  return months[monthNum - 1];
}

export function getMonthsBetweenDates(startDate, endDate) {
  var months = [];
  var currentDate = new Date(startDate);
  var endDate = new Date(endDate);

  while (currentDate <= endDate) {
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var year = currentDate.getFullYear();
    var date = currentDate.getDate();
    months.push(date + '-' + month + '-' + year);
    currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(endDate.getDate());
  }

  return months;
}