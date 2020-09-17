import { AppBar, Box, Divider, Tab, Tabs } from "@material-ui/core";
import React, { Fragment } from "react";
import SwipeableViews from "react-swipeable-views";
import { Schema } from "../../../@Types";
import EventsMain from "../Content/Events/EventsMain";
import PrizesMain from "../Content/Prizes/PrizesMain";
import ResourcesMain from "../Content/Resources/ResourcesMain";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

declare interface TabbedSectionsProps {
  config: Schema;
  classes: any;
}

const TabbedSections: React.FunctionComponent<TabbedSectionsProps> = ({
  config,
  classes,
}) => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setCurrentTab(index);
  };

  const showEvents = config.events.length > 0;
  const showPrizes = config.prizes.length > 0;
  const showResources = config.resources.length > 0;
  /** TODO: CONTENT GOES HERE */

  const tabs = [] as JSX.Element[];

  const generateTabOrder = () => {
    if (showEvents) {
      tabs.push(<EventsMain events={config.events} classes={classes} />);
    }
    if (showPrizes) {
      tabs.push(<PrizesMain prizes={config.prizes} classes={classes} />);
    }
    if (showResources) {
      tabs.push(
        <ResourcesMain resources={config.resources} classes={classes} />
      );
    }
    /** TODO: CONTENT GOES HERE */
  };

  generateTabOrder();

  return (
    <Fragment>
      {tabs.length > 0 && (
        <Fragment>
          <Divider className={classes.marginedTopBottom} />
          <AppBar position="static" color="default">
            <Tabs
              value={currentTab}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {showEvents && <Tab label="Events and Activities" />}
              {showPrizes && <Tab label="Prizes" />}
              {showResources && <Tab label="Resources" />}
              {/** TODO: CONTENT GOES HERE */}
            </Tabs>
          </AppBar>

          <SwipeableViews
            axis={"x"}
            index={currentTab}
            onChangeIndex={handleChangeIndex}
          >
            {tabs.map((element, index) => {
              return (
                <TabPanel value={currentTab} index={index} key={`tab_${index}`}>
                  {element}
                </TabPanel>
              );
            })}
          </SwipeableViews>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TabbedSections;
