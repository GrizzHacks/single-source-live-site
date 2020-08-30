import { Container, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { StageSchema } from "../../../../@Types";
import StageTimer from "./StageTimer";

declare interface StagesMainProps {
  stages: StageSchema[];
  classes: any;
}

const StagesMain: React.FunctionComponent<StagesMainProps> = ({
  stages,
  classes,
}) => {
  const findCurrentStage = () => {
    const currentTime = new Date();
    for (const stage of stages) {
      if (currentTime < stage.endTime) {
        return stage;
      }
    }
    // The last stage has already ended; there are now more upcoming.
    return undefined;
  };

  const [currentStage, setCurrentStage] = React.useState<
    StageSchema | undefined
  >(findCurrentStage());

  return currentStage ? (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h4">{currentStage.stageName} in </Typography>
      </Container>
      <StageTimer
        valueOfEndTime={currentStage.endTime.valueOf()}
        nextStage={() => setCurrentStage(findCurrentStage())}
        classes={classes}
      />
    </Fragment>
  ) : (
    <Fragment />
  );
};

export default StagesMain;
