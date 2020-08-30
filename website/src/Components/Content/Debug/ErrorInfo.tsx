import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import React, { Fragment } from "react";
import { SchemaError } from "../../../../@Types";

declare interface ErrorInfoProps {
  error: SchemaError;
  classes: any;
}

const ErrorInfo: React.FunctionComponent<ErrorInfoProps> = ({
  error,
  classes,
}) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        {error.type === "error" ? (
          <Avatar className={classes.errorColor}>
            <ErrorIcon />
          </Avatar>
        ) : error.type === "warning" ? (
          <Avatar className={classes.warningColor}>
            <WarningIcon />
          </Avatar>
        ) : (
          <Avatar className={classes.infoColor}>
            <InfoIcon />
          </Avatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={error.error}
        secondary={
          <Fragment>
            <Typography variant="body1" component="span">
              {error.toFix}
            </Typography>
            {error.toFix && <br />}
            {`${error.document} : ${error.property}`}
          </Fragment>
        }
      />
      {/** TODO: Add toFixLinks support **/}
    </ListItem>
  );
};

export default ErrorInfo;
