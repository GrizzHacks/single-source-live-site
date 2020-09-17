import { PrizeSchema, SchemaError } from "../../@Types";
import prizesJson from "../Data/prizes.json";
import { propertyExistsFactory } from "./parseHelpers";

export const parsePrizesJson = (): [PrizeSchema[], SchemaError[]] => {
  const prizes: { [key: string]: any } = prizesJson;
  const errors: SchemaError[] = [];
  const propertyExists = propertyExistsFactory(prizes, "prizes.json", errors);
  const prizeSchemas: PrizeSchema[] = [];

  // prizes
  if (
    propertyExists(
      "prizes",
      false,
      "the various prizes you're providing at your hackathon. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#prizesjson"
    )
  ) {
    if (Array.isArray(prizes.prizes)) {
      // prizes is a valid array, start checking each prize
      prizes.prizes.map((currentPrize, index) => {
        // Verify that all of the required prize properties exist
        const propertyExistsInPrize = propertyExistsFactory(
          currentPrize,
          "prizes.json",
          errors,
          `prizes[${index}]`
        );
        /* const warnIfNotLink = warnIfNotLinkFactory(
          currentPrize,
          "prizes.json",
          errors,
          `prizes[${index}]`
        ); */
        const hasPrizeName = propertyExistsInPrize(
          "prizeName",
          true,
          "the name of the prize category. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#prizesjson"
        );
        const hasPrizeDescription = propertyExistsInPrize(
          "prizeDescription",
          true,
          "a description of the prize category. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#prizesjson"
        );
        const hasPrize = propertyExistsInPrize(
          "prize",
          true,
          "the prize itself. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#prizesjson"
        );

        if (hasPrizeName && hasPrizeDescription && hasPrize) {
          // prize object has all required properties, check data
          const prizeSchema: PrizeSchema = {
            prizeName: "",
            prizeDescription: "",
            prize: "",
          };

          // Validate prizeName
          if (typeof currentPrize.prizeName === "string") {
            // prizeName is a valid string
            prizeSchema.prizeName = currentPrize.prizeName;
          } else {
            try {
              // prizeName can be converted to a string
              prizeSchema.prizeName = currentPrize.prizeName.toString();
              errors.push({
                document: "prizes.json",
                property: `prizes[${index}].prizeName`,
                type: "warning",
                error: `prizes[${index}].prizeName is not a string.`,
                toFix:
                  "In most cases, just make sure your prize name has quotes around it.",
              });
            } catch {
              // prizeName cannot be converted to a string
              errors.push({
                document: "prizes.json",
                property: `prizes[${index}].prizeName`,
                type: "error",
                error: `prizes[${index}].prizeName is not a string.`,
              });
            }
          }

          // Validate prizeDescription
          if (typeof currentPrize.prizeDescription === "string") {
            // prizeDescription is a valid string
            prizeSchema.prizeDescription = currentPrize.prizeDescription;
          } else {
            try {
              // prizeDescription can be converted to a string
              prizeSchema.prizeDescription = currentPrize.prizeDescription.toString();
              errors.push({
                document: "prizes.json",
                property: `prizes[${index}].prizeDescription`,
                type: "warning",
                error: `prizes[${index}].prizeDescription is not a string.`,
                toFix:
                  "In most cases, just make sure your prize description has quotes around it.",
              });
            } catch {
              // prizeDescription cannot be converted to a string
              errors.push({
                document: "prizes.json",
                property: `prizes[${index}].prizeDescription`,
                type: "error",
                error: `prizes[${index}].prizeDescription is not a string.`,
              });
            }
          }

          // Validate prize
          if (typeof currentPrize.prize === "string") {
            // prize is a valid string
            prizeSchema.prize = currentPrize.prize;
          } else {
            try {
              // prize can be converted to a string
              prizeSchema.prize = currentPrize.prize.toString();
              errors.push({
                document: "prizes.json",
                property: `prizes[${index}].prize`,
                type: "warning",
                error: `prizes[${index}].prize is not a string.`,
                toFix:
                  "In most cases, just make sure your prize description has quotes around it.",
              });
            } catch {
              // prize cannot be converted to a string
              errors.push({
                document: "prizes.json",
                property: `prizes[${index}].prize`,
                type: "error",
                error: `prizes[${index}].prize is not a string.`,
              });
            }
          }

          // prizeValue
          if (
            propertyExistsInPrize("prizeValue", false, "the value of the prize")
          ) {
            if (typeof currentPrize.prizeValue === "string") {
              prizeSchema.prizeValue = currentPrize.prizeValue;
            } else {
              try {
                // prizeValue can be converted to a string
                prizeSchema.prizeValue = currentPrize.prizeValue.toString();
                errors.push({
                  document: "events.json",
                  property: "prizeValue",
                  type: "warning",
                  error: "prizeValue is not a string.",
                  toFix:
                    "In most cases, just make sure your event prizeValue has quotes around it.",
                });
              } catch {
                // prizeValue cannot be converted to a string
                errors.push({
                  document: "events.json",
                  property: "prizeValue",
                  type: "error",
                  error: "prizeValue is not a string.",
                });
              }
            }
          }

          // prizeSponsor
          if (
            propertyExistsInPrize(
              "prizeSponsor",
              false,
              "the sponsor of the prize"
            )
          ) {
            if (typeof currentPrize.prizeSponsor === "string") {
              prizeSchema.prizeSponsor = currentPrize.prizeSponsor;
            } else {
              try {
                // prizeSponsor can be converted to a string
                prizeSchema.prizeSponsor = currentPrize.prizeSponsor.toString();
                errors.push({
                  document: "events.json",
                  property: "prizeSponsor",
                  type: "warning",
                  error: "prizeSponsor is not a string.",
                  toFix:
                    "In most cases, just make sure your event prizeSponsor has quotes around it.",
                });
              } catch {
                // prizeSponsor cannot be converted to a string
                errors.push({
                  document: "events.json",
                  property: "prizeSponsor",
                  type: "error",
                  error: "prizeSponsor is not a string.",
                });
              }
            }
          }

          // eligibility
          if (
            propertyExistsInPrize(
              "eligibility",
              false,
              "the eligibility requirements to compete for the prize"
            )
          ) {
            if (typeof currentPrize.eligibility === "string") {
              prizeSchema.eligibility = currentPrize.eligibility;
            } else {
              try {
                // eligibility can be converted to a string
                prizeSchema.eligibility = currentPrize.eligibility.toString();
                errors.push({
                  document: "events.json",
                  property: "eligibility",
                  type: "warning",
                  error: "eligibility is not a string.",
                  toFix:
                    "In most cases, just make sure your event eligibility has quotes around it.",
                });
              } catch {
                // eligibility cannot be converted to a string
                errors.push({
                  document: "events.json",
                  property: "eligibility",
                  type: "error",
                  error: "eligibility is not a string.",
                });
              }
            }
          }

          if (
            prizeSchema.prizeName &&
            prizeSchema.prizeDescription &&
            prizeSchema.prize
          ) {
            // All required fields are valid.
            prizeSchemas.push(prizeSchema);
          }
        }
        return null;
      });
    } else {
      // prizes is not an array
      errors.push({
        document: "prizes.json",
        property: "prizes",
        type: "error",
        error: "prizes is not an array.",
        toFix:
          "For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#prizesjson.",
      });
    }
  }

  return [prizeSchemas, errors];
};
