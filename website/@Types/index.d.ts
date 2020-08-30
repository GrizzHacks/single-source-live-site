import { Color } from "@material-ui/core";

declare interface Schema {
  config: ConfigSchema;
  stages: StageSchema[];
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
