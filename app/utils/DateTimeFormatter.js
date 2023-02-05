import dayjs from "dayjs";

// Takes in DateTimePicker output and separates date and time components selected by user
// returns new Date in IST merging above inputs

const DateTimeFormatter = (date, time) => {
  var dateFormatted = dayjs(date).format();
  var timeFormatted = dayjs(time).format();

  const formattedTime =
    dateFormatted.split("T")[0] + "T" + timeFormatted.split("T")[1];

  //console.log(formattedTime);

  return new Date(formattedTime);
};

export default DateTimeFormatter;
