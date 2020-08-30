import { SchemaError } from "../../@Types";

export const propertyExistsFactory = (
  data: { [key: string]: any },
  document: string,
  errors: SchemaError[]
) => {
  return (property: string, required: boolean, contains: string) => {
    if (!data[property]) {
      errors.push({
        document,
        property,
        type: required ? "error" : "info",
        error: `No ${property} provided${required ? "!" : "."}`,
        toFix: `${
          required ? "A" : "If you'd like, you can a"
        }dd a field called ${property} to ${document} containing ${contains}.`,
      });
      return false;
    }
    return true;
  };
};
