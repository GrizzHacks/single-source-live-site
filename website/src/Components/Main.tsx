import { Container, Divider, Fab } from "@material-ui/core";
import BugReportIcon from "@material-ui/icons/BugReport";
import React, { Fragment } from "react";
import { getConfig } from "../Scripts/getConfig";
import { styles } from "../Styles";
import DebugMain from "./Content/Debug/DebugMain";
import LinksMain from "./Content/Links/LinksMain";
import StagesMain from "./Content/Stages/StagesMain";
import NavBar from "./Layouts/NavBar";
import NotificationBar, { NotificationMessage } from "./Misc/Notifications";

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
  const [debugInfo, setDebugInfo] = React.useState<boolean>(false);
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
        {debugInfo && (
          <Fragment>
            <DebugMain config={config} classes={classes} />
            <Divider className={classes.marginedTopBottom} />
          </Fragment>
        )}
        <StagesMain stages={config.stages} classes={classes} />
        <Divider className={classes.marginedTopBottom} />
        <LinksMain links={config.links} classes={classes} />
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
