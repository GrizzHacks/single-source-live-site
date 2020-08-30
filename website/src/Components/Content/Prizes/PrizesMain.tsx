import { Container, List, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { PrizeSchema } from "../../../../@Types";
import PrizeInfo from "./PrizeInfo";

declare interface PrizesMainProps {
  prizes: PrizeSchema[];
  classes: any;
}

const PrizesMain: React.FunctionComponent<PrizesMainProps> = ({
  prizes,
  classes,
}) => {
  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h4">Prizes</Typography>
      </Container>
      <List>
        {prizes.map((prize, index) => {
          return (
            <PrizeInfo key={`prize_${index}`} prize={prize} classes={classes} />
          );
        })}
      </List>
    </Fragment>
  );
};

export default PrizesMain;
