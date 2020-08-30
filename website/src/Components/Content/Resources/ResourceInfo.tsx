import {
  Avatar,
  Fab,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";
import LaunchIcon from "@material-ui/icons/Launch";
import React from "react";
import { ResourceSchema } from "../../../../@Types";

declare interface ResourceInfoProps {
  resource: ResourceSchema;
  classes: any;
}

const ResourceInfo: React.FunctionComponent<ResourceInfoProps> = ({
  resource,
  classes,
}) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={classes.brandingColor}>
          <BookIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${resource.resourceName} ${
          resource.resourceValue ? "(" + resource.resourceValue + " value)" : ""
        }`}
        secondary={resource.resourceDescription}
      />
      <ListItemSecondaryAction>
        <Fab
          color="primary"
          onClick={() => {
            window.open(resource.resourceLink, "_blank");
          }}
        >
          <LaunchIcon />
        </Fab>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ResourceInfo;
