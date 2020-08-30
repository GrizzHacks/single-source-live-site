import { Color } from "@material-ui/core";

declare interface Schema {
  config: ConfigSchema;
  stages: StageSchema[];
  events: EventSchema[];
  resources: ResourceSchema[];
  links: LinksSchema;
  errors: SchemaError[];
}

declare interface ConfigSchema {
  hackathonName: string;
  timeZoneOffset: number;
  brandingColor?: string | Color;
}

declare interface StageSchema {
  stageName: string;
  endTime: Date;
}

declare interface EventSchema {
  eventName: string;
  speakers: EventSpeakerSchema[];
  startTime: Date;
  endTime: Date;
  eventDescription: string;
  icon: string;
  type: string;
  location?: string;
  joinLink?: string;
  eventColor?: string;
}

declare interface EventSpeakerSchema {
  speakerName: string;
  speakerRole: string;
  speakerPhoto: string;
}

declare interface ResourceSchema {
  resourceName: string;
  resourceDescription: string;
  resourceLink: string;
  resourceValue?: string;
}

declare interface LinksSchema {
  codeOfConduct: string;
  joinSlack?: string;
  slackWorkspace?: string;
  discord?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  twitch?: string;
  youtube?: string;
  devpost?: string;
  website?: string;
  otherLinks?: CustomLink[];
}

declare interface CustomLink {
  linkTitle: string;
  link: string;
}

declare interface SchemaError {
  document: string;
  property: string;
  type: SchemaErrorType;
  error: string;
  toFix?: string;
  toFixLinks?: [{ title: string; link: string }];
}

declare type SchemaErrorType = "warning" | "error" | "info";
