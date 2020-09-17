import {
  Container,
  FormControlLabel,
  List,
  Switch,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { EventSchema } from "../../../../@Types";
import { updateCurrentTime } from "../../../Scripts/timeCounterKey";
import EventInfo from "./EventInfo";

declare interface EventsMainProps {
  events: EventSchema[];
  classes: any;
}

const EventsMain: React.FunctionComponent<EventsMainProps> = ({
  events,
  classes,
}) => {
  const [showPastEvents, setShowPastEvents] = React.useState<boolean>(false);
  const [currentTimeMilliseconds, setCurrentTimeMilliseconds] = React.useState<
    number
  >(0);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const binEventsByDate = () => {
    const binnedEvents: { [key: string]: EventSchema[] } = {};
    for (const event of events) {
      if (showPastEvents || event.endTime.getTime() > Date.now()) {
        const dateString = `${event.startTime.getFullYear()}${event.startTime.getMonth()}${event.startTime.getDate()}`;
        if (binnedEvents[dateString]) {
          binnedEvents[dateString].push(event);
        } else {
          binnedEvents[dateString] = [event];
        }
      }
    }
    const binnedEventsArray: EventSchema[][] = [];
    for (const day in binnedEvents) {
      binnedEventsArray.push(binnedEvents[day]);
    }
    if (binnedEventsArray.length === 0) {
      const eventPlaceHolder: EventSchema = {
        eventName: "No Upcoming Events...",
        type: "No Events",
        speakers: [],
        startTime: new Date(new Date().toDateString()),
        endTime: (() => {
          const tempDate = new Date();
          tempDate.setDate(tempDate.getDate() + 1);
          const date = new Date(tempDate.toDateString());
          date.setMilliseconds(date.getMilliseconds() - 1);
          return date;
        })(),
        eventDescription: "Sorry, but there are no upcoming events...",
        icon: "",
        eventColor: "",
      };
      binnedEventsArray.push([eventPlaceHolder]);
    }
    return binnedEventsArray;
  };

  if (!loaded) {
    setLoaded(true);
    updateCurrentTime(Math.random(), setCurrentTimeMilliseconds);
  }

  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h4">Events and Activities</Typography>
      </Container>
      <Typography variant="body1">
        Note: All times are in your local time zone!
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={showPastEvents}
            onChange={() => {
              setShowPastEvents(!showPastEvents);
            }}
            name="showPastEventsSwitch"
            color="primary"
          />
        }
        label="Show Past Events"
      />
      {binEventsByDate().map((eventList, dayIndex) => {
        return (
          <Fragment key={`day_${dayIndex}`}>
            <Container className={classes.pageTitle}>
              <Typography variant="h5">
                {eventList[0].startTime.toLocaleDateString()}
              </Typography>
            </Container>
            <List>
              {eventList.map((event, index) => {
                return (
                  <EventInfo
                    key={`event_${index}`}
                    event={event}
                    currentTimeMilliseconds={currentTimeMilliseconds}
                    classes={classes}
                  />
                );
              })}
            </List>
          </Fragment>
        );
      })}

      {/** TODO: Allow Toggle on/off for showing past events */}
    </Fragment>
  );
};

export default EventsMain;
