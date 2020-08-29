import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React, { Fragment } from "react";
import Main from "../Components/Main";
import { darkTheme, lightTheme } from "./theme";
import { useDarkMode } from "./useDarkMode";

const CustomThemeProvider: React.FunctionComponent = () => {
  const { theme, toggleTheme, componentMounted } = useDarkMode();

  if (!componentMounted) {
    return <Fragment />;
  }

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Fragment>
        <CssBaseline />
        <Main theme={theme} toggleTheme={toggleTheme} />
      </Fragment>
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
