const unableToParseErrorMessage = "Unable to parse timeZoneOffset.";
const offsetMustBeWithinBoundsErrorMessage = [
  `${unableToParseErrorMessage} The offset cannot be greater than 12 or less than -12.`,
  "To fix this, just make sure that there is no more than a 12 hour offset. Example: +13:00 should become -11:00.",
];

export const timeZoneOffsetParser = (
  timeZoneOffset: any
): number | string[] => {
  if (typeof timeZoneOffset === "number") {
    if (timeZoneOffset < -12 || timeZoneOffset > 12) {
      return offsetMustBeWithinBoundsErrorMessage;
    }
    return timeZoneOffset;
  } else if (typeof timeZoneOffset === "string") {
    // Verify the offset it either positive or negative
    if (timeZoneOffset.charAt(0) !== "+" && timeZoneOffset.charAt(0) !== "-") {
      return [
        `${unableToParseErrorMessage} An offset string must either start with '+' or '-'.`,
        "Odds are, you just need to add a '+' in front of your timeZoneOffset.",
      ];
    }
    // Strip the plus off of the time zone offset, assume no sign is positive
    let timeZoneOffsetString = timeZoneOffset;
    if (timeZoneOffset.charAt(0) === "+") {
      timeZoneOffsetString = timeZoneOffset.substring(1);
    }
    try {
      if (timeZoneOffsetString.includes(":")) {
        // Time zone offset is a time stamp
        const hours = parseInt(
          timeZoneOffsetString.substring(0, timeZoneOffsetString.indexOf(":"))
        );
        if (hours < -12 || hours > 12) {
          return offsetMustBeWithinBoundsErrorMessage;
        }
        const minutesString = timeZoneOffsetString.substring(
          timeZoneOffsetString.indexOf(":") + 1
        );
        if (minutesString.length !== 2) {
          return [
            `${unableToParseErrorMessage} Expected two digits for the minutes in the time stamp.`,
            "Just double check that your timeZoneOffset looks something like '+4:00'.",
          ];
        }
        const minutes = parseInt(minutesString);
        if (minutes >= 60) {
          return [
            `${unableToParseErrorMessage} The minutes of the time stamp must be between 0 and 59.`,
          ];
        }
        return hours >= 0 ? hours + minutes / 60 : hours - minutes / 60;
      } else if (timeZoneOffsetString.includes(".")) {
        // Time zone offset contains a decimal point
        const offset = parseFloat(timeZoneOffsetString);
        if (offset < -12 || offset > 12) {
          return offsetMustBeWithinBoundsErrorMessage;
        }
        return offset;
      } else {
        // Time zone offset is an integer
        const offset = parseInt(timeZoneOffsetString);
        if (offset < -12 || offset > 12) {
          return offsetMustBeWithinBoundsErrorMessage;
        }
        return offset;
      }
    } catch {
      return [unableToParseErrorMessage];
    }
  } else {
    return [unableToParseErrorMessage];
  }
};

export const correctTimezones = (date: Date, schemaTimeZoneOffset: number) => {
  if (!isNaN(date.valueOf())) {
    // Only adjust the time zone if it is a valid date...
    date.setMinutes(
      // Note schemaTimeZoneOffset is already negative by defintion, so we add it...
      date.getMinutes() - (schemaTimeZoneOffset * 60 + date.getTimezoneOffset())
    );
  }
  return date;
};
