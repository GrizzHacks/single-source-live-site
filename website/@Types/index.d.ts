import { Color } from "@material-ui/core";

declare interface Schema {
  config: ConfigSchema;
  errors: SchemaError[];
}

declare interface ConfigSchema {
  hackathonName: string;
  timeZoneOffset: number;
  brandingColor?: string | Color;
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
