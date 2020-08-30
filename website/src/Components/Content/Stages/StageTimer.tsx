import { Grid } from "@material-ui/core";
import React from "react";
import Timer from "react-compound-timer";
import StageTimerNumber from "./StageTimerNumber";

declare interface StageTimerProps {
  valueOfEndTime: number;
  nextStage: () => void;
  classes: any;
}

const StageTimer: React.FunctionComponent<StageTimerProps> = ({
  valueOfEndTime,
  nextStage,
  classes,
}) => {
  return (
    <Timer
      initialTime={valueOfEndTime - new Date().valueOf()}
      direction="backward"
      checkpoints={[
        {
          time: 0,
          callback: () => {
            // Note: The timer does not reinitialize when calling nextStage,
            // so instead the page is refreshed.
            // FIXME: Figueout how to change the timer value without a refresh...
            window.location.reload();
          },
        },
      ]}
    >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={3}>
          <StageTimerNumber label="days" classes={classes}>
            <Timer.Days />
          </StageTimerNumber>
        </Grid>
        <Grid item xs={3}>
          <StageTimerNumber label="hours" classes={classes}>
            <Timer.Hours />
          </StageTimerNumber>
        </Grid>
        <Grid item xs={3}>
          <StageTimerNumber label="minutes" classes={classes}>
            <Timer.Minutes />
          </StageTimerNumber>
        </Grid>
        <Grid item xs={3}>
          <StageTimerNumber label="seconds" classes={classes}>
            <Timer.Seconds />
          </StageTimerNumber>
        </Grid>
      </Grid>
    </Timer>
  );
};

export default StageTimer;
