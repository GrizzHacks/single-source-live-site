import { SchemaError, StageSchema } from "../../@Types";
import stagesJson from "../Data/stages.json";
import { propertyExistsFactory } from "./parseHelpers";
import { correctTimezones } from "./timeZoneHelpers";

export const parseStagesJson = (
  schemaTimeZoneOffset: number
): [StageSchema[], SchemaError[]] => {
  const stages: { [key: string]: any } = stagesJson;
  const errors: SchemaError[] = [];
  const propertyExists = propertyExistsFactory(stages, "stages.json", errors);
  const stageSchemas: StageSchema[] = [];

  // stages
  if (
    propertyExists(
      "stages",
      false,
      "the various stages of your hackathon. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#stagesjson"
    )
  ) {
    if (Array.isArray(stages.stages)) {
      // stages is a valid array, start checking each stage
      stages.stages.map((currentStage, index) => {
        // Verify that all of the required stage properties exist
        const propertyExistsInStage = propertyExistsFactory(
          currentStage,
          "stages.json",
          errors,
          `stages[${index}]`
        );
        const hasStageName = propertyExistsInStage(
          "stageName",
          true,
          "the name of the stage. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#stagesjson"
        );
        const hasEndTime = propertyExistsInStage(
          "endTime",
          true,
          "the end time of the stage as an ISO timestamp. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#stagesjson"
        );

        if (hasStageName && hasEndTime) {
          // stage object has all required properties, check data
          const stageSchema: StageSchema = {
            stageName: "",
            endTime: new Date(),
          };

          // Validate stageName
          if (typeof currentStage.stageName === "string") {
            // stageName is a valid string
            stageSchema.stageName = currentStage.stageName;
          } else {
            try {
              // stageName can be converted to a string
              stageSchema.stageName = currentStage.stageName.toString();
              errors.push({
                document: "stages.json",
                property: `stages[${index}].stageName`,
                type: "warning",
                error: `stages[${index}].stageName is not a string.`,
                toFix:
                  "In most cases, just make sure your stage name has quotes around it.",
              });
            } catch {
              // stageName cannot be converted to a string
              errors.push({
                document: "stages.json",
                property: `stages[${index}].stageName`,
                type: "error",
                error: `stages[${index}].stageName is not a string.`,
              });
            }
          }

          // Validate endTime
          if (typeof currentStage.endTime === "string") {
            stageSchema.endTime = correctTimezones(
              new Date(currentStage.endTime),
              schemaTimeZoneOffset
            );
            if (isNaN(stageSchema.endTime.valueOf())) {
              // endTime cannot be parsed as a date!
              errors.push({
                document: "stages.json",
                property: `stages[${index}].endTime`,
                type: "error",
                error: `stages[${index}].endTime is not valid date.`,
              });
            } else if (stageSchema.stageName) {
              // Both stageName and endTime are valid, push the object to stageSchemas
              stageSchemas.push(stageSchema);
            }
          } else {
            // endTime is not a valid string, therefore it cannot be parsed!
            errors.push({
              document: "stages.json",
              property: `stages[${index}].endTime`,
              type: "error",
              error: `stages[${index}].endTime is not a string.`,
            });
          }
        }
        return null;
      });
    } else {
      // stages is not an array
      errors.push({
        document: "stages.json",
        property: "stages",
        type: "error",
        error: "stages is not an array.",
        toFix:
          "For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#stagesjson.",
      });
    }
  }

  return [stageSchemas, errors];
};
