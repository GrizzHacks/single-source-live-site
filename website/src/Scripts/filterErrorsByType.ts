import { SchemaError, SchemaErrorType } from "../../@Types";

export const filterErrorsByType = (
  errors: SchemaError[],
  type: SchemaErrorType
) => {
  return errors.reduce((output, currentError) => {
    if (currentError.type === type) {
      output.push(currentError);
    }
    return output;
  }, [] as SchemaError[]);
};
