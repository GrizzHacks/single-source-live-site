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
