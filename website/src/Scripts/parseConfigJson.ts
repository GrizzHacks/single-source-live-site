import { ConfigSchema, SchemaError } from "../../@Types";
import configJson from "../Data/config.json";
import { propertyExistsFactory } from "./parseHelpers";

export const parseConfigJson = (): [ConfigSchema, SchemaError[]] => {
  const config: { [key: string]: any } = configJson;
  const errors: SchemaError[] = [];
  const propertyExists = propertyExistsFactory(config, "config.json", errors);
  const configSchema: ConfigSchema = {
    hackathonName: "",
    timeZoneOffset: 0,
    brandingColor: "",
  };

  // hackathonName
  if (propertyExists("hackathonName", true, "the name of your hackathon")) {
    if (typeof config.hackathonName === "string") {
      configSchema.hackathonName = config.hackathonName;
    } else {
      configSchema.hackathonName = config.hackathonName.toString();
      errors.push({
        document: "config.json",
        property: "hackathonName",
        type: "warning",
        error: "hackathonName is not a string.",
        toFix:
          "In most cases, just make sure your hackathon name has quotes around it.",
      });
    }
  }

  return [configSchema, errors];
};
