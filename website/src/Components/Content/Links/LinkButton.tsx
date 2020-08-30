import { Button, Typography } from "@material-ui/core";
import React from "react";

declare interface LinkButtonProps {
  title: string;
  link: string;
  icon: any;
  classes: any;
}

const LinkButton: React.FunctionComponent<LinkButtonProps> = ({
  title,
  link,
  icon,
  classes,
}) => {
  return (
    <Button
      color="primary"
      fullWidth
      variant="contained"
      onClick={() => {
        window.open(link, "_blank");
      }}
      startIcon={icon}
    >
      <Typography variant="h6">{title}</Typography>
    </Button>
  );
};

export default LinkButton;
