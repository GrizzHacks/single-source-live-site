import { Container, List, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { ResourceSchema } from "../../../../@Types";
import ResourceInfo from "./ResourceInfo";

declare interface ResourcesMainProps {
  resources: ResourceSchema[];
  classes: any;
}

const ResourcesMain: React.FunctionComponent<ResourcesMainProps> = ({
  resources,
  classes,
}) => {
  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h4">Resources</Typography>
      </Container>
      <List>
        {resources.map((resource, index) => {
          return (
            <ResourceInfo
              key={`resource_${index}`}
              resource={resource}
              classes={classes}
            />
          );
        })}
      </List>
    </Fragment>
  );
};

export default ResourcesMain;
