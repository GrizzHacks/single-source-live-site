import { Schema } from "../../@Types";
import { parseConfigJson } from "./parseConfigJson";
import { parseLinksJson } from "./parseLinksJson";
import { parseStagesJson } from "./parseStagesJson";

let schema: Schema | null = null;

export const getConfig = (): Schema => {
  if (!schema) {
    schema = readSchema();
  }
  return schema;
};

const readSchema = (): Schema => {
  const [config, configErrors] = parseConfigJson();
  const [stages, stageErrors] = parseStagesJson(config.timeZoneOffset);
  const [links, linkErrors] = parseLinksJson();
  return {
    config,
    stages,
    links,
    errors: configErrors.concat(stageErrors, linkErrors),
  };
};
