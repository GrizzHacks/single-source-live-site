import { Container, List, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { EventSchema } from "../../../../@Types";
import EventInfo from "./EventInfo";

declare interface EventsMainProps {
  events: EventSchema[];
  classes: any;
}

const EventsMain: React.FunctionComponent<EventsMainProps> = ({
  events,
  classes,
}) => {
  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h4">Events and Activities</Typography>
      </Container>
      <List>
        {events.map((event, index) => {
          return (
            <EventInfo key={`event_${index}`} event={event} classes={classes} />
          );
        })}
      </List>

      {/** TODO: Allow Toggle on/off for showing past events, add day headers */}
    </Fragment>
  );
};

export default EventsMain;
