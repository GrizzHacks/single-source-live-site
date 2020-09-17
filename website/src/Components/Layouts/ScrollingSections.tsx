import { Divider } from "@material-ui/core";
import React, { Fragment } from "react";
import { Schema } from "../../../@Types";
import EventsMain from "../Content/Events/EventsMain";
import PrizesMain from "../Content/Prizes/PrizesMain";
import ResourcesMain from "../Content/Resources/ResourcesMain";

declare interface ScrollingSectionsProps {
  config: Schema;
  classes: any;
}

const ScrollingSections: React.FunctionComponent<ScrollingSectionsProps> = ({
  config,
  classes,
}) => {
  return (
    <Fragment>
      {config.events.length > 0 && (
        <Fragment>
          <Divider className={classes.marginedTopBottom} />
          <EventsMain events={config.events} classes={classes} />
        </Fragment>
      )}
      {config.prizes.length > 0 && (
        <Fragment>
          <Divider className={classes.marginedTopBottom} />
          <PrizesMain prizes={config.prizes} classes={classes} />
        </Fragment>
      )}
      {config.resources.length > 0 && (
        <Fragment>
          <Divider className={classes.marginedTopBottom} />
          <ResourcesMain resources={config.resources} classes={classes} />
        </Fragment>
      )}
      {/** TODO: CONTENT GOES HERE */}
    </Fragment>
  );
};

export default ScrollingSections;
