import { Container, Typography, Grid } from "@material-ui/core";
import WebIcon from "@material-ui/icons/Web";
import React, { Fragment } from "react";
import { LinksSchema } from "../../../../@Types";
import LinkButton from "./LinkButton";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import AddCommentIcon from "@material-ui/icons/AddComment";
import AssignmentIcon from "@material-ui/icons/Assignment";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import BookIcon from "@material-ui/icons/Book";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

declare interface LinksMainProps {
  links: LinksSchema;
  classes: any;
}

const LinksMain: React.FunctionComponent<LinksMainProps> = ({
  links,
  classes,
}) => {
  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h4">Important Links</Typography>
      </Container>

      <Typography variant="h5" className={classes.centerText}>
        General Info and Submissions
      </Typography>
      <Grid container spacing={2} className={classes.marginedTopBottom}>
        {links.website && (
          <Grid item xs>
            <LinkButton
              title="Website"
              link={links.website}
              icon={<WebIcon />}
              classes={classes}
            />
          </Grid>
        )}
        {links.devpost && (
          <Grid item xs>
            <LinkButton
              title="Devpost"
              link={links.devpost}
              icon={<AssignmentIcon />}
              classes={classes}
            />
          </Grid>
        )}
        {links.codeOfConduct && (
          <Grid item xs>
            <LinkButton
              title="Code of Conduct"
              link={links.codeOfConduct}
              icon={<BookIcon />}
              classes={classes}
            />
          </Grid>
        )}
      </Grid>

      {(links.joinSlack ||
        links.slackWorkspace ||
        links.discord ||
        links.twitch ||
        links.youtube) && (
        <Fragment>
          <Typography variant="h5" className={classes.centerText}>
            Communications and Streaming
          </Typography>
          <Grid container spacing={2} className={classes.marginedTopBottom}>
            {links.joinSlack && (
              <Grid item xs>
                <LinkButton
                  title="Join Slack"
                  link={links.joinSlack}
                  icon={<AddCommentIcon />}
                  classes={classes}
                />
              </Grid>
            )}
            {links.slackWorkspace && (
              <Grid item xs>
                <LinkButton
                  title="Slack Workspace"
                  link={links.slackWorkspace}
                  icon={<QuestionAnswerIcon />}
                  classes={classes}
                />
              </Grid>
            )}
            {links.discord && (
              <Grid item xs>
                <LinkButton
                  title="Discord"
                  link={links.discord}
                  icon={<QuestionAnswerIcon />}
                  classes={classes}
                />
              </Grid>
            )}
            {links.twitch && (
              <Grid item xs>
                <LinkButton
                  title="Twitch"
                  link={links.twitch}
                  icon={<OndemandVideoIcon />}
                  classes={classes}
                />
              </Grid>
            )}
            {links.youtube && (
              <Grid item xs>
                <LinkButton
                  title="YouTube"
                  link={links.youtube}
                  icon={<YouTubeIcon />}
                  classes={classes}
                />
              </Grid>
            )}
          </Grid>
        </Fragment>
      )}

      {(links.facebook ||
        links.instagram ||
        links.twitter ||
        links.linkedin) && (
        <Fragment>
          <Typography variant="h5" className={classes.centerText}>
            Social Media
          </Typography>
          <Grid container spacing={2} className={classes.marginedTopBottom}>
            {links.facebook && (
              <Grid item xs>
                <LinkButton
                  title="Facebook"
                  link={links.facebook}
                  icon={<FacebookIcon />}
                  classes={classes}
                />
              </Grid>
            )}
            {links.instagram && (
              <Grid item xs>
                <LinkButton
                  title="Instagram"
                  link={links.instagram}
                  icon={<InstagramIcon />}
                  classes={classes}
                />
              </Grid>
            )}
            {links.twitter && (
              <Grid item xs>
                <LinkButton
                  title="Twitter"
                  link={links.twitter}
                  icon={<TwitterIcon />}
                  classes={classes}
                />
              </Grid>
            )}
            {links.linkedin && (
              <Grid item xs>
                <LinkButton
                  title="LinkedIn"
                  link={links.linkedin}
                  icon={<LinkedInIcon />}
                  classes={classes}
                />
              </Grid>
            )}
          </Grid>
        </Fragment>
      )}

      {links.otherLinks && (
        <Fragment>
          <Typography variant="h5" className={classes.centerText}>
            Other Links
          </Typography>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LinksMain;
