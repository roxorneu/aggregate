// Takes in DateTimePicker output and separates date and time components selected by user
// returns new Date in IST merging above inputs

const DateTimeFormatter = (date, time) => {
  //date.toISOString() is known to return date off by one day, to be fixed later

  const formattedTime =
    date.toISOString().split("T")[0] +
    "T" +
    time.toTimeString().split(" ")[0] +
    "+05:30";

  return new Date(formattedTime);
};

export default DateTimeFormatter;
