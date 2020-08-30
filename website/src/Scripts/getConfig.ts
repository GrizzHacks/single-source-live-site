import { Schema } from "../../@Types";
import { parseConfigJson } from "./parseConfigJson";
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
  return {
    config,
    stages,
    errors: configErrors.concat(stageErrors),
  };
};
