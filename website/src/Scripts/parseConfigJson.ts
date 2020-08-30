import { ConfigSchema, SchemaError } from "../../@Types";
import configJson from "../Data/config.json";
import { propertyExistsFactory } from "./parseHelpers";
import { timeZoneOffsetParser } from "./timeZoneHelpers";
import { brandingColorParser } from "./brandingColorHelper";

export const parseConfigJson = (): [ConfigSchema, SchemaError[]] => {
  const config: { [key: string]: any } = configJson;
  const errors: SchemaError[] = [];
  const propertyExists = propertyExistsFactory(config, "config.json", errors);
  const configSchema: ConfigSchema = {
    hackathonName: "",
    timeZoneOffset: 0,
  };

  // hackathonName
  if (propertyExists("hackathonName", true, "the name of your hackathon")) {
    if (typeof config.hackathonName === "string") {
      configSchema.hackathonName = config.hackathonName;
    } else {
      try {
        // hackathonName can be converted to a string
        configSchema.hackathonName = config.hackathonName.toString();
        errors.push({
          document: "config.json",
          property: "hackathonName",
          type: "warning",
          error: "hackathonName is not a string.",
          toFix:
            "In most cases, just make sure your hackathon name has quotes around it.",
        });
      } catch {
        // hackathonName cannot be converted to a string
        errors.push({
          document: "config.json",
          property: "hackathonName",
          type: "error",
          error: "hackathonName is not a string.",
        });
      }
    }
  }

  // timeZoneOffset
  if (
    propertyExists(
      "timeZoneOffset",
      true,
      "the time zone offset from UTC of your hackathon"
    )
  ) {
    const timeZoneOffsetParsed = timeZoneOffsetParser(config.timeZoneOffset);
    if (typeof timeZoneOffsetParsed === "number") {
      configSchema.timeZoneOffset = timeZoneOffsetParsed;
    } else {
      errors.push({
        document: "config.json",
        property: "timeZoneOffset",
        type: "error",
        error: timeZoneOffsetParsed[0],
        toFix: timeZoneOffsetParsed[1],
      });
    }
  }

  // timeZoneOffset
  if (
    propertyExists(
      "brandingColor",
      false,
      "the main branding color of your hackathon"
    )
  ) {
    const brandingColorParsed = brandingColorParser(config.brandingColor);
    if (typeof brandingColorParsed === "string") {
      configSchema.brandingColor = brandingColorParsed;
    } else {
      errors.push({
        document: "config.json",
        property: "brandingColor",
        type: "error",
        error: brandingColorParsed[0],
        toFix: brandingColorParsed[1],
      });
    }
  }

  return [configSchema, errors];
};
