import { Container, List, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { Schema } from "../../../../@Types";
import { filterErrorsByType } from "../../../Scripts/filterErrorsByType";
import ErrorInfo from "./ErrorInfo";

declare interface DebugMainProps {
  config: Schema;
  classes: any;
}

const DebugMain: React.FunctionComponent<DebugMainProps> = ({
  config,
  classes,
}) => {
  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h4">Debug Mode Enabled</Typography>
      </Container>
      <Typography variant="body1">
        This section contains helpful information regarding your configuation.
        It is only displayed when viewing this page from localhost. To close
        debug mode, click the bug icon in the lower right-hand corner.
      </Typography>

      <Container className={classes.pageTitle}>
        <Typography variant="h5">Schema Time Zone</Typography>
        <Typography variant="body1">
          {config.config.timeZoneOffset} hour offest from UTC.
        </Typography>
      </Container>
      <Container className={classes.pageTitle}>
        <Typography variant="h5">
          Errors, Warnings, and Info from Parsing Data
        </Typography>
      </Container>
      <List>
        {filterErrorsByType(config.errors, "error").map((error, index) => {
          return (
            <ErrorInfo error={error} key={`error_${index}`} classes={classes} />
          );
        })}
        {filterErrorsByType(config.errors, "warning").map((error, index) => {
          return (
            <ErrorInfo
              error={error}
              key={`warning_${index}`}
              classes={classes}
            />
          );
        })}
        {filterErrorsByType(config.errors, "info").map((error, index) => {
          return (
            <ErrorInfo error={error} key={`info_${index}`} classes={classes} />
          );
        })}
      </List>
    </Fragment>
  );
};

export default DebugMain;
