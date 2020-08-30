import { LinksSchema, SchemaError } from "../../@Types";
import linksJson from "../Data/links.json";
import { propertyExistsFactory, warnIfNotLinkFactory } from "./parseHelpers";

export const parseLinksJson = (): [LinksSchema, SchemaError[]] => {
  const links: { [key: string]: any } = linksJson;
  const errors: SchemaError[] = [];
  const propertyExists = propertyExistsFactory(links, "links.json", errors);
  const warnIfNotLink = warnIfNotLinkFactory(links, "links.json", errors);
  const linksSchema: LinksSchema = {
    codeOfConduct: "https://static.mlh.io/docs/mlh-code-of-conduct.pdf",
  };

  // codeOfConduct
  if (
    propertyExists(
      "codeOfConduct",
      false,
      "the code of conduct for your hackathon. In the mean time, this property defaults to the MLH Code of Conduct"
    )
  ) {
    if (typeof links.codeOfConduct === "string") {
      linksSchema.codeOfConduct = links.codeOfConduct;
      warnIfNotLink("codeOfConduct");
    } else {
      // codeOfConduct is not a string, therefore cannot be a link
      errors.push({
        document: "links.json",
        property: "codeOfConduct",
        type: "warning",
        error:
          "codeOfConduct is not a string. In the mean time, this property defaults to the MLH Code of Conduct",
      });
    }
  }

  // joinSlack
  if (
    propertyExists(
      "joinSlack",
      false,
      "the join link to the Slack workspace for your hackathon"
    )
  ) {
    if (typeof links.joinSlack === "string") {
      linksSchema.joinSlack = links.joinSlack;
      warnIfNotLink("joinSlack");
    } else {
      // joinSlack is not a string, therefore cannot be a link
      errors.push({
        document: "links.json",
        property: "joinSlack",
        type: "warning",
        error: "joinSlack is not a string",
      });
    }
  }

  // slackWorkspace
  if (
    propertyExists(
      "slackWorkspace",
      false,
      "the Slack workspace for your hackathon"
    )
  ) {
    if (typeof links.slackWorkspace === "string") {
      linksSchema.slackWorkspace = links.slackWorkspace;
      warnIfNotLink("slackWorkspace");
    } else {
      // slackWorkspace is not a string, therefore cannot be a link
      errors.push({
        document: "links.json",
        property: "slackWorkspace",
        type: "warning",
        error: "slackWorkspace is not a string",
      });
    }
  }
  // discord
  if (
    propertyExists("discord", false, "the Discord server for your hackathon")
  ) {
    if (typeof links.discord === "string") {
      linksSchema.discord = links.discord;
      warnIfNotLink("discord");
    } else {
      // discord is not a string, therefore cannot be a link
      errors.push({
        document: "links.json",
        property: "discord",
        type: "warning",
        error: "discord is not a string",
      });
    }
  }
  // facebook
  if (
    propertyExists("facebook", false, "the Facebook page for your hackathon")
  ) {
    if (typeof links.facebook === "string") {
      linksSchema.facebook = links.facebook;
      warnIfNotLink("facebook");
    } else {
      // facebook is not a string, therefore cannot be a link
      errors.push({
        document: "links.json",
        property: "facebook",
        type: "warning",
        error: "facebook is not a string",
      });
    }
  }
  // instagram
  if (
    propertyExists(
      "instagram",
      false,
      "the Instagram profile for your hackathon"
    )
  ) {
    if (typeof links.instagram === "string") {
      linksSchema.instagram = links.instagram;
      warnIfNotLink("instagram");
    } else {
      // instagram is not a string, therefore cannot be a link
      errors.push({
        document: "links.json",
        property: "instagram",
        type: "warning",
        error: "instagram is not a string",
      });
    }
  }
  // twitter
  if (
    propertyExists("twitter", false, "the Twitter profile for your hackathon")
  ) {
    if (typeof links.twitter === "string") {
      linksSchema.twitter = links.twitter;
      warnIfNotLink("twitter");
    } else {
      // twitter is not a string, therefore cannot be a link
      errors.push({
        document: "links.json",
        property: "twitter",
        type: "warning",
        error: "twitter is not a string",
      });
    }
  }
  // linkedin
  if (
    propertyExists("linkedin", false, "the LinkedIn page for your hackathon")
  ) {
    if (typeof links.linkedin === "string") {
      linksSchema.linkedin = links.linkedin;
      warnIfNotLink("linkedin");
    } else {
      // linkedin is not a string, therefore cannot be a link
      errors.push({
        document: "links.json",
        property: "linkedin",
        type: "warning",
        error: "linkedin is not a string",
      });
    }
  }
  // twitch
  if (propertyExists("twitch", false, "the Twitch stream for your hackathon")) {
    if (typeof links.twitch === "string") {
      linksSchema.twitch = links.twitch;
      warnIfNotLink("twitch");
    } else {
      // twitch is not a string, therefore cannot be a link
      errors.push({
        document: "links.json",
        property: "twitch",
        type: "warning",
        error: "twitch is not a string",
      });
    }
  }
  // youtube
  if (
    propertyExists("youtube", false, "the YouTube channel for your hackathon")
  ) {
    if (typeof links.youtube === "string") {
      linksSchema.youtube = links.youtube;
      warnIfNotLink("youtube");
    } else {
      // youtube is not a string, therefore cannot be a link
      errors.push({
        document: "links.json",
        property: "youtube",
        type: "warning",
        error: "youtube is not a string",
      });
    }
  }
  // devpost
  if (propertyExists("devpost", false, "the Devpost for your hackathon")) {
    if (typeof links.devpost === "string") {
      linksSchema.devpost = links.devpost;
      warnIfNotLink("devpost");
    } else {
      // devpost is not a string, therefore cannot be a link
      errors.push({
        document: "links.json",
        property: "devpost",
        type: "warning",
        error: "devpost is not a string",
      });
    }
  }
  // website
  if (propertyExists("website", false, "the main website for your hackathon")) {
    if (typeof links.website === "string") {
      linksSchema.website = links.website;
      warnIfNotLink("website");
    } else {
      // website is not a string, therefore cannot be a link
      errors.push({
        document: "links.json",
        property: "website",
        type: "warning",
        error: "website is not a string",
      });
    }
  }

  return [linksSchema, errors];
};
