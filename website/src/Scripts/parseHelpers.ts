import { SchemaError } from "../../@Types";

export const propertyExistsFactory = (
  data: { [key: string]: any },
  document: string,
  errors: SchemaError[]
) => {
  return (property: string, required: boolean, contains: string) => {
    if (!data[property]) {
      if (required) {
        errors.push({
          document,
          property,
          type: "error",
          error: `No ${property} provided!`,
          toFix: `Add a field called ${property} to ${document} containing ${contains}.`,
        });
      }
      return false;
    }
    return true;
  };
};
