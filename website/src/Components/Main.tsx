import { Container } from "@material-ui/core";
import React, { Fragment } from "react";
import { styles } from "../Styles";
import NavBar from "./Layouts/NavBar";
import NotificationBar, { NotificationMessage } from "./Misc/Notifications";
import { getConfig } from "../Scripts/getConfig";

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
        {/** TODO: CONTENT GOES HERE */}
      </Container>
      <NotificationBar
        notification={notification}
        setNotification={setNotification}
      />
    </Fragment>
  );
};

export default Main;
