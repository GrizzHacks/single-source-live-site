import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import React, { Fragment } from "react";
import { PrizeSchema } from "../../../../@Types";

declare interface PrizeInfoProps {
  prize: PrizeSchema;
  classes: any;
}

const PrizeInfo: React.FunctionComponent<PrizeInfoProps> = ({
  prize,
  classes,
}) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={classes.brandingColor}>
          <CategoryIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${prize.prizeName} ${
          prize.prizeSponsor ? "sponsored by " + prize.prizeSponsor : ""
        }`}
        secondary={
          <Fragment>
            <Typography variant="body1" component="span">
              {prize.prize}{" "}
              {prize.prizeValue ? `(${prize.prizeValue} value)` : ""}
            </Typography>
            <br />
            {prize.prizeDescription}
            {prize.eligibility && <br />}
            {prize.eligibility}
          </Fragment>
        }
      />
    </ListItem>
  );
};

export default PrizeInfo;
