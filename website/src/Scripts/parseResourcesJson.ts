import { ResourceSchema, SchemaError } from "../../@Types";
import resourcesJson from "../Data/resources.json";
import { propertyExistsFactory, warnIfNotLinkFactory } from "./parseHelpers";

export const parseResourcesJson = (): [ResourceSchema[], SchemaError[]] => {
  const resources: { [key: string]: any } = resourcesJson;
  const errors: SchemaError[] = [];
  const propertyExists = propertyExistsFactory(
    resources,
    "resources.json",
    errors
  );
  const resourceSchemas: ResourceSchema[] = [];

  // resources
  if (
    propertyExists(
      "resources",
      false,
      "the various resources you're providing at your hackathon. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#resourcesjson"
    )
  ) {
    if (Array.isArray(resources.resources)) {
      // resources is a valid array, start checking each resource
      resources.resources.map((currentResource, index) => {
        // Verify that all of the required resource properties exist
        const propertyExistsInResource = propertyExistsFactory(
          currentResource,
          "resources.json",
          errors,
          `resources[${index}]`
        );
        const warnIfNotLink = warnIfNotLinkFactory(
          currentResource,
          "resources.json",
          errors,
          `resources[${index}]`
        );
        const hasResourceName = propertyExistsInResource(
          "resourceName",
          true,
          "the name of the resource. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#resourcesjson"
        );
        const hasResourceDescription = propertyExistsInResource(
          "resourceDescription",
          true,
          "a description of the resource. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#resourcesjson"
        );
        const hasResourceLink = propertyExistsInResource(
          "resourceLink",
          true,
          "the link to the resource. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#resourcesjson"
        );

        if (hasResourceName && hasResourceDescription && hasResourceLink) {
          // resource object has all required properties, check data
          const resourceSchema: ResourceSchema = {
            resourceName: "",
            resourceDescription: "",
            resourceLink: "",
          };

          // Validate resourceName
          if (typeof currentResource.resourceName === "string") {
            // resourceName is a valid string
            resourceSchema.resourceName = currentResource.resourceName;
          } else {
            try {
              // resourceName can be converted to a string
              resourceSchema.resourceName = currentResource.resourceName.toString();
              errors.push({
                document: "resources.json",
                property: `resources[${index}].resourceName`,
                type: "warning",
                error: `resources[${index}].resourceName is not a string.`,
                toFix:
                  "In most cases, just make sure your resource name has quotes around it.",
              });
            } catch {
              // resourceName cannot be converted to a string
              errors.push({
                document: "resources.json",
                property: `resources[${index}].resourceName`,
                type: "error",
                error: `resources[${index}].resourceName is not a string.`,
              });
            }
          }

          // Validate resourceDescription
          if (typeof currentResource.resourceDescription === "string") {
            // resourceDescription is a valid string
            resourceSchema.resourceDescription =
              currentResource.resourceDescription;
          } else {
            try {
              // resourceDescription can be converted to a string
              resourceSchema.resourceDescription = currentResource.resourceDescription.toString();
              errors.push({
                document: "resources.json",
                property: `resources[${index}].resourceDescription`,
                type: "warning",
                error: `resources[${index}].resourceDescription is not a string.`,
                toFix:
                  "In most cases, just make sure your resource description has quotes around it.",
              });
            } catch {
              // resourceDescription cannot be converted to a string
              errors.push({
                document: "resources.json",
                property: `resources[${index}].resourceDescription`,
                type: "error",
                error: `resources[${index}].resourceDescription is not a string.`,
              });
            }
          }

          // resourceLink
          if (typeof currentResource.resourceLink === "string") {
            resourceSchema.resourceLink = currentResource.resourceLink;
            warnIfNotLink("resourceLink");
          } else {
            // resourceLink is not a string, therefore cannot be a link
            errors.push({
              document: "resources.json",
              property: "resourceLink",
              type: "warning",
              error: "resourceLink is not a string",
            });
          }

          // resourceValue
          if (
            propertyExistsInResource(
              "resourceValue",
              false,
              "the value of the resource"
            )
          ) {
            if (typeof currentResource.resourceValue === "string") {
              resourceSchema.resourceValue = currentResource.resourceValue;
            } else {
              try {
                // resourceValue can be converted to a string
                resourceSchema.resourceValue = currentResource.resourceValue.toString();
                errors.push({
                  document: "events.json",
                  property: "resourceValue",
                  type: "warning",
                  error: "resourceValue is not a string.",
                  toFix:
                    "In most cases, just make sure your event resourceValue has quotes around it.",
                });
              } catch {
                // resourceValue cannot be converted to a string
                errors.push({
                  document: "events.json",
                  property: "resourceValue",
                  type: "error",
                  error: "resourceValue is not a string.",
                });
              }
            }
          }

          if (
            resourceSchema.resourceName &&
            resourceSchema.resourceDescription &&
            resourceSchema.resourceLink
          ) {
            // All required fields are valid.
            resourceSchemas.push(resourceSchema);
          }
        }
        return null;
      });
    } else {
      // resources is not an array
      errors.push({
        document: "resources.json",
        property: "resources",
        type: "error",
        error: "resources is not an array.",
        toFix:
          "For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#resourcesjson.",
      });
    }
  }

  return [resourceSchemas, errors];
};
