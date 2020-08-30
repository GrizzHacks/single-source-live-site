import { createMuiTheme } from "@material-ui/core";
import { getConfig } from "../Scripts/getConfig";

const config = getConfig();

export const lightTheme = createMuiTheme({
  palette: {
    primary:
      typeof config.config.brandingColor === "string"
        ? { main: config.config.brandingColor }
        : undefined,
    secondary: undefined,
    success: undefined,
    error: undefined,
    info: undefined,
    warning: undefined,
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary:
      typeof config.config.brandingColor === "string"
        ? { main: config.config.brandingColor }
        : undefined,
    secondary: undefined,
    success: undefined,
    error: undefined,
    info: undefined,
    warning: undefined,
  },
});
