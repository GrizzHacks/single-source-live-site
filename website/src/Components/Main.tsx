import { Container, Fab } from "@material-ui/core";
import BugReportIcon from "@material-ui/icons/BugReport";
import React, { Fragment } from "react";
import { getConfig } from "../Scripts/getConfig";
import { styles } from "../Styles";
import DebugMain from "./Content/Debug/DebugMain";
import NavBar from "./Layouts/NavBar";
import NotificationBar, { NotificationMessage } from "./Misc/Notifications";
import StagesMain from "./Content/Stages/StagesMain";

declare interface MainProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Main: React.FunctionComponent<MainProps> = ({ theme, toggleTheme }) => {
  const [notification, setNotification] = React.useState<NotificationMessage>({
    type: "info",
    message: "",
    open: false,
  });
  const [debugInfo, setDebugInfo] = React.useState<boolean>(
    window.location.href.includes("localhost")
  );
  const config = getConfig();

  const classes = styles();

  return (
    <Fragment>
      <NavBar
        pageTitle={config.config.hackathonName}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Container className={classes.marginedTopBottom}>
        {debugInfo && <DebugMain config={config} classes={classes} />}
        <StagesMain stages={config.stages} classes={classes} />
        {/** TODO: CONTENT GOES HERE */}
      </Container>
      <NotificationBar
        notification={notification}
        setNotification={setNotification}
      />
      {window.location.href.includes("localhost") && (
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => {
            setDebugInfo(!debugInfo);
          }}
        >
          <BugReportIcon />
        </Fab>
      )}
    </Fragment>
  );
};

export default Main;
