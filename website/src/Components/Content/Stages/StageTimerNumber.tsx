import { Card, Typography } from "@material-ui/core";
import React from "react";

declare interface StageTimerNumberProps {
  label: string;
  classes: any;
}

const StageTimerNumber: React.FunctionComponent<StageTimerNumberProps> = ({
  children,
  label,
  classes,
}) => {
  return (
    <Card className={classes.stageTimerNumberCard}>
      <Typography variant="h2">{children}</Typography>
      <Typography variant="h6">{label}</Typography>
    </Card>
  );
};

export default StageTimerNumber;
