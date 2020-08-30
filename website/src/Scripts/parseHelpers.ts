import { SchemaError } from "../../@Types";

export const propertyExistsFactory = (
  data: { [key: string]: any },
  document: string,
  errors: SchemaError[],
  historicalPropertyPath: string = ""
) => {
  if (historicalPropertyPath) {
    // Make valid path when merged with current property
    historicalPropertyPath += ".";
  }
  return (property: string, required: boolean, contains: string) => {
    if (!data[property]) {
      errors.push({
        document,
        property: `${historicalPropertyPath}${property}`,
        type: required ? "error" : "info",
        error: `No ${historicalPropertyPath}${property} provided${
          required ? "!" : "."
        }`,
        toFix: `${
          required ? "A" : "If you'd like, you can a"
        }dd a field called ${historicalPropertyPath}${property} to ${document} containing ${contains}.`,
      });
      return false;
    }
    return true;
  };
};

export const warnIfNotLinkFactory = (
  data: { [key: string]: any },
  document: string,
  errors: SchemaError[],
  historicalPropertyPath: string = ""
) => {
  if (historicalPropertyPath) {
    // Make valid path when merged with current property
    historicalPropertyPath += ".";
  }
  return (property: string) => {
    if (
      !data[property].toLowerCase().includes("https://") &&
      !data[property].toLowerCase().includes("http://")
    ) {
      errors.push({
        document,
        property: `${historicalPropertyPath}${property}`,
        type: "warning",
        error: `${historicalPropertyPath}${property} does not appear to be a link. Please double check this points to where you want hackers to go.`,
        toFix:
          "Note: you may just want to add 'https://' or 'http://' in front of the link to make sure it links properly.",
      });
    }
  };
};
