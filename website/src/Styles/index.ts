import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { lightTheme as light, darkTheme as dark } from "./theme";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(2),
    },
    margined: {
      margin: theme.spacing(2),
    },
    marginedTopBottom: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    marginedPadded: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    },
    marginRight: {
      marginRight: theme.spacing(2),
    },
    marginsAuto: {
      margin: "auto",
    },
    centerText: {
      textAlign: "center",
    },
    pageTitle: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    infoColor: {
      color: "#FFFFFF",
      backgroundColor: theme.palette.info.main,
    },
    warningColor: {
      color: "#FFFFFF",
      backgroundColor: theme.palette.warning.main,
    },
    errorColor: {
      color: "#FFFFFF",
      backgroundColor: theme.palette.error.main,
    },
    fab: {
      position: "absolute",
      bottom: "0px",
      right: "0px",
      margin: theme.spacing(2),
    },
    stageTimerNumberCard: {
      padding: theme.spacing(2),
      textAlign: "center",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
  })
);

export const lightTheme = light;
export const darkTheme = dark;
