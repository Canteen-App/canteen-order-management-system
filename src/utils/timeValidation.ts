import { start } from "repl";

// Standard Time format. Ex: 02:00am, 12:23pm
const TIME_FORMAT = /^(0[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/;

export const createTimeFormatStr = (
  hour: number,
  minute: number,
  period: string
) => {
  const timeStr =
    String("0" + hour).slice(-2) +
    ":" +
    String("0" + minute).slice(-2) +
    period;

  if (TIME_FORMAT.test(timeStr)) {
    return timeStr;
  }

  return null;
};

export const extractValuesFromTimeStr = (timeStr: string) => {
  // Use match() to extract hour, minute, and period
  const match = timeStr.match(TIME_FORMAT);

  if (match) {
    const hour = parseInt(match[1]); // Extracted hour
    const minute = parseInt(match[2]); // Extracted minute
    const period = match[3]; // Extracted period (am/pm)

    return {
      hour: hour,
      minute: minute,
      period: period,
    };
  } else {
  }
};

export const validateStartEndTimes = (startTime: string, endTime: string) => {
  const startTimeDateTime = convertTimeToDate(startTime);
  const endTimeDateTime = convertTimeToDate(endTime);

  console.log(startTimeDateTime)
  console.log(endTimeDateTime)

  if (startTimeDateTime && endTimeDateTime) {
    console.log(startTimeDateTime < endTimeDateTime)
    return startTimeDateTime < endTimeDateTime;
  }

  return false;
};

function convertTimeToDate(timeStr: string) {
  // Get current date
  var currentDate = new Date();

  // Extract hours and minutes from time string
  var timeComponents = timeStr.match(TIME_FORMAT);
  if (timeComponents) {
    var hours = parseInt(timeComponents[1]);
    var minutes = parseInt(timeComponents[2]);
    var period = timeComponents[3].toLowerCase();

    // Adjust hours for pm
    if (period === "pm" && hours < 12) {
      hours += 12;
    }

    // Set time
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    return currentDate;
  }
}
