import { EventSchema, SchemaError } from "../../@Types";
import eventsJson from "../Data/events.json";
import { propertyExistsFactory, warnIfNotLinkFactory } from "./parseHelpers";
import { correctTimezones } from "./timeZoneHelpers";

export const parseEventsJson = (
  schemaTimeZoneOffset: number
): [EventSchema[], SchemaError[]] => {
  const events: { [key: string]: any } = eventsJson;
  const errors: SchemaError[] = [];
  const propertyExists = propertyExistsFactory(events, "events.json", errors);
  const eventSchemas: EventSchema[] = [];

  // events
  if (
    propertyExists(
      "events",
      false,
      "the various events of your hackathon. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#eventsjson"
    )
  ) {
    if (Array.isArray(events.events)) {
      // events is a valid array, start checking each event
      events.events.map((currentEvent, index) => {
        // Verify that all of the required event properties exist
        const propertyExistsInEvent = propertyExistsFactory(
          currentEvent,
          "events.json",
          errors,
          `events[${index}]`
        );
        const warnIfNotLink = warnIfNotLinkFactory(
          currentEvent,
          "events.json",
          errors,
          `events[${index}]`
        );
        const hasEventName = propertyExistsInEvent(
          "eventName",
          true,
          "the name of the event. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#eventsjson"
        );
        const hasStartTime = propertyExistsInEvent(
          "startTime",
          true,
          "the start time of the event as an ISO timestamp. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#eventsjson"
        );
        const hasEndTime = propertyExistsInEvent(
          "endTime",
          true,
          "the end time of the event as an ISO timestamp. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#eventsjson"
        );
        const hasEventDescription = propertyExistsInEvent(
          "eventDescription",
          true,
          "a description of the event. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#eventsjson"
        );
        const hasType = propertyExistsInEvent(
          "type",
          true,
          "the type of event. For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#eventsjson"
        );

        if (
          hasEventName &&
          hasStartTime &&
          hasEndTime &&
          hasEventDescription &&
          hasType
        ) {
          // event object has all required properties, check data
          const eventSchema: EventSchema = {
            eventName: "",
            speakers: [],
            startTime: new Date(),
            endTime: new Date(),
            eventDescription: "",
            icon: "calendar_today",
            type: "",
          };

          // Validate eventName
          if (typeof currentEvent.eventName === "string") {
            // eventName is a valid string
            eventSchema.eventName = currentEvent.eventName;
          } else {
            try {
              // eventName can be converted to a string
              eventSchema.eventName = currentEvent.eventName.toString();
              errors.push({
                document: "events.json",
                property: `events[${index}].eventName`,
                type: "warning",
                error: `events[${index}].eventName is not a string.`,
                toFix:
                  "In most cases, just make sure your event name has quotes around it.",
              });
            } catch {
              // eventName cannot be converted to a string
              errors.push({
                document: "events.json",
                property: `events[${index}].eventName`,
                type: "error",
                error: `events[${index}].eventName is not a string.`,
              });
            }
          }

          // Validate eventDescription
          if (typeof currentEvent.eventDescription === "string") {
            // eventDescription is a valid string
            eventSchema.eventDescription = currentEvent.eventDescription;
          } else {
            try {
              // eventDescription can be converted to a string
              eventSchema.eventDescription = currentEvent.eventDescription.toString();
              errors.push({
                document: "events.json",
                property: `events[${index}].eventDescription`,
                type: "warning",
                error: `events[${index}].eventDescription is not a string.`,
                toFix:
                  "In most cases, just make sure your event description has quotes around it.",
              });
            } catch {
              // eventDescription cannot be converted to a string
              errors.push({
                document: "events.json",
                property: `events[${index}].eventDescription`,
                type: "error",
                error: `events[${index}].eventDescription is not a string.`,
              });
            }
          }

          // Validate type
          if (typeof currentEvent.type === "string") {
            // type is a valid string
            eventSchema.type = currentEvent.type;
          } else {
            try {
              // type can be converted to a string
              eventSchema.type = currentEvent.type.toString();
              errors.push({
                document: "events.json",
                property: `events[${index}].type`,
                type: "warning",
                error: `events[${index}].type is not a string.`,
                toFix:
                  "In most cases, just make sure your event type has quotes around it.",
              });
            } catch {
              // type cannot be converted to a string
              errors.push({
                document: "events.json",
                property: `events[${index}].type`,
                type: "error",
                error: `events[${index}].type is not a string.`,
              });
            }
          }

          // Validate startTime
          if (typeof currentEvent.startTime === "string") {
            eventSchema.startTime = correctTimezones(
              new Date(currentEvent.startTime),
              schemaTimeZoneOffset
            );
            if (isNaN(eventSchema.startTime.valueOf())) {
              // startTime cannot be parsed as a date!
              errors.push({
                document: "events.json",
                property: `events[${index}].startTime`,
                type: "error",
                error: `events[${index}].startTime is not valid date.`,
              });
            }
          } else {
            // startTime is not a valid string, therefore it cannot be parsed!
            errors.push({
              document: "events.json",
              property: `events[${index}].startTime`,
              type: "error",
              error: `events[${index}].startTime is not a string.`,
            });
          }

          // Validate endTime
          if (typeof currentEvent.endTime === "string") {
            eventSchema.endTime = correctTimezones(
              new Date(currentEvent.endTime),
              schemaTimeZoneOffset
            );
            if (isNaN(eventSchema.endTime.valueOf())) {
              // endTime cannot be parsed as a date!
              errors.push({
                document: "events.json",
                property: `events[${index}].endTime`,
                type: "error",
                error: `events[${index}].endTime is not valid date.`,
              });
            }
          } else {
            // endTime is not a valid string, therefore it cannot be parsed!
            errors.push({
              document: "events.json",
              property: `events[${index}].endTime`,
              type: "error",
              error: `events[${index}].endTime is not a string.`,
            });
          }

          // location
          if (
            propertyExistsInEvent(
              "location",
              false,
              "the location of the event"
            )
          ) {
            if (typeof currentEvent.location === "string") {
              eventSchema.location = currentEvent.location;
            } else {
              try {
                // location can be converted to a string
                eventSchema.location = currentEvent.location.toString();
                errors.push({
                  document: "events.json",
                  property: "location",
                  type: "warning",
                  error: "location is not a string.",
                  toFix:
                    "In most cases, just make sure your event location has quotes around it.",
                });
              } catch {
                // location cannot be converted to a string
                errors.push({
                  document: "events.json",
                  property: "location",
                  type: "error",
                  error: "location is not a string.",
                });
              }
            }
          }

          // joinLink
          if (
            propertyExistsInEvent(
              "joinLink",
              false,
              "the link to join the event virtually"
            )
          ) {
            if (typeof currentEvent.joinLink === "string") {
              eventSchema.joinLink = currentEvent.joinLink;
              warnIfNotLink("joinLink");
            } else {
              // joinLink is not a string, therefore cannot be a link
              errors.push({
                document: "events.json",
                property: "joinLink",
                type: "warning",
                error: "joinLink is not a string",
              });
            }
          }

          if (
            eventSchema.eventName &&
            !isNaN(eventSchema.startTime.valueOf()) &&
            !isNaN(eventSchema.startTime.valueOf()) &&
            eventSchema.eventDescription &&
            eventSchema.type
          ) {
            // All required fields are valid.
            eventSchemas.push(eventSchema);
          }
        }
        return null;
      });
    } else {
      // events is not an array
      errors.push({
        document: "events.json",
        property: "events",
        type: "error",
        error: "events is not an array.",
        toFix:
          "For reference, check out https://github.com/andrewdimmer/single-source/blob/main/docs/dataStructure.md#eventsjson.",
      });
    }
  }

  return [eventSchemas, errors];
};
