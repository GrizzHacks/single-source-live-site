# Data Structure

Learn how different settings are parsed in Single Source.

TODO: Figure out how to document optional vs. required fields.

## config.json

This is the main document that defines common attributes for your hackathon in general.

```json
{
  "hackathonName": "The name of your hackathon",
  "timeZoneOffset": "The time zone offset from UTC for the time zone you are in. Pay special attention to standard time vs. daylight saving time. (Examples: -4, 1, 9.5, '-4', '+1', '-4:00', '+1:00', '+9:30').",
  "brandingColor": "Either a hex color code, or a Material standard color (Example: 'Red' or 'Red[500]'). For more information, check out https://material.io/design/color/the-color-system.html#tools-for-picking-colors/",
  "tabs": "A boolean representing if tabs or a single scrolling page should be used to seperate sections."
}
```

## stages.json

This defines the different stages that show up on the main timer. For example, the banner at the top that says "Hacking ends in [Time]" would be defined by in this document.

TODO: In the future, stages should automatically be sorted by end time. In the mean time, they go by array order.

```json
{
  "stages": [
    {
      "stageName": "The name to put above the timer. (Examples: 'Registration Closes', 'Opening Cermoney Starts', 'Hacking Ends', 'Judging Starts', etc.).",
      "endTime": "A date time in ISO 8601 format. Do not specify a time zone, it defaults to the timezone declared in config.json. (Example: '2020-08-30T13:00')."
    }
  ]
}
```

## events.json

This defines the events that take place at your hackaton. For example, this is where you would lay out your schedule for opening/closing cermonies, workshops, tech talks, mini-events, meals, and more.

TODO: Speaker Information Coming Soon!

TODO: In the future, events should automatically be sorted by end time. In the mean time, they go by array order.

```json
{
  "events": [
    {
      "eventName": "The name of the event.",
      "speakers": [
        {
          "speakerName": "The name of the speaker.",
          "speakerRole": "The role of the speaker. (Exmaple: 'Keynote Speaker', 'Tech Talk Presenter', 'Moderater', 'Panalist', 'Facilitator', 'A/V Coordinator', 'Volunteer', etc.).",
          "speakerPhoto": "A profile picture of the speaker. Defaults to an avitar if not defined.",
          "speakerContactInfo": "COMING SOON!"
        }
      ],
      "startTime": "A date time in ISO 8601 format. Note that if no time zone is specified, it defaults to the timezone declared in config.json.",
      "endTime": "A date time in ISO 8601 format. Note that if no time zone is specified, it defaults to the timezone declared in config.json.",
      "eventDescription": "A description of the event",
      "icon": "COMING SOON! A Material Icon to represent the event. This is helpful to mark the type of events via a symbol. Defaults to calendar_today if not defined. For more info on Material icons, check out https://material.io/resources/icons/?style=baseline.",
      "type": "The type of event. (Examples: 'Virtual Workshop', 'Meal', 'Mini-Event', 'Virtual Networking', etc.).",
      "location": "The location of the event. (Example: 'Room A113', 'Registration Desk', 'Main Lobby', etc.).",
      "joinLink": "Hosting a virtual event or live streaming an in person event? Add the link here! Goes live to hackers 10 minutes before the scheduled start time",
      "eventColor": "COMING SOON!"
    }
  ]
}
```

## prizes.json

This defines prizes and prize cateogries you have at your hackaton.

```json
{
  "prizes": [
    {
      "prizeName": "The name of the prize track. (Examples: 'Best Hardware Hack', 'Most Creative Hack', '1st Place', etc.).",
      "prizeSponsor": "The name of your prize sponsor. (Examples: 'Google Cloud Platform', 'MLH', etc.).",
      "prizeDescription": "A description of the prize track. (Example: 'Build something fun to remember the Summer with.').",
      "prize": "The prize you are giving. (Examples: 'Nitendo Switch', '$100 Amazon Gift Card', 'Inteview with a VC', etc.).",
      "prizeValue": "If you want to show the monitary value of the prize (say it is a free trial to something) add that here. (Example: '$79').",
      "eligibility": "If there are any requirements to go for this prize. (Examples: 'At least 50% of your team must be first time hackers', 'You must use Google Cloud Platform somewhere in your project', etc.)."
    }
  ]
}
```

## resources.json

This defines any resources you want to share with hackers at your hackaton. Note that this is also a great place to add any resouces you may have received from sponsors.

```json
{
  "resources": [
    {
      "resourceName": "The title of the resource. (Example: 'Get started with Machine Learning on Google Cloud Platform').",
      "resourceDescription": "A description of what the reource is. (Example: 'Start using machine learning in your project with no prior expirence. Learn about ML APIs that you can use out of the box, and AutoML to train your own with no programming required.').",
      "resourceLink": "A link to the resource.",
      "resourceValue": "Have a resource your giving for free at your hackathon (like a free domain name)? Add the value here!"
    }
  ]
}
```

## submission.json

This defines any information you have about submitting to your hackathon.

TODO: Add a Parser and Display for this section.

```json
{
  "submissionLink": "A link to your submission system. (Example: 'your-hackathon.devpost.com').",
  "softDeadline": "This is the time an entry needs to be made in the submission system.",
  "hardDeadline": "This is the time when hacking stops and editing submissions cuts off, and all new submissions may not be judged.",
  "requirements": [
    {
      "requirementTitle": "The name of the requirement. (Examples: 'Demo Video', 'Code Repository', etc.).",
      "requirementDescription": "A description of the requirement. (Examples: 'You must submit a public demo video showing your project in less than 2 minutes', 'Please submit a link to a GitHub repository containing your source code', etc.)."
    }
  ],
  "instructions": "COMING SOON!",
  "tutorialVideo": "COMING SOON!",
  "judgingCriteria": [
    {
      "criteriaTitle": "The general category of what you are judging on. (Example: 'Creativity', 'Technical Implementation', etc.).",
      "description": "More info about the criteria here"
    }
  ]
}
```

## sponsors.json

Every hackathon needs some sort of support. Acknoledge your sponsors here!

TODO: Add a Parser and Display for this section.

```json
{
  "sponsors": [
    {
      "sponsorName": "The name of your sponsor. (Example: 'Major League Hacking').",
      "logoUrl": "A link to the sponsor's logo",
      "sponsorLink": "A link to the sponsor's website",
      "tier": "If your hackathon has sponsor tiers, specify the tier here. Note, you also need to define the order of the tiers in the tiers list below.",
      "logoSize": "xl, l, m, sm, xs"
    }
  ],
  "tiers": ["top tier", "middle tier(s)", "bottom tier"]
}
```

## links.json

Have important links for your hackers to know? Add them here!

TODO: Determine whether or not to keep "other links". This seems like a conflict with resources...

```json
{
  "codeOfConduct": "The link to the code of conduct for your hackathon. If no link is provided, defaults to the MLH code of Conduct",
  "joinSlack": "A link to join the Slack.",
  "slackWorkspace": "A link to the Slack workspace (for those who have already joined).",
  "discord": "A link to the Discord",
  "facebook": "A link to your hackathon's Facebook page",
  "twitter": "A link to your hackathon's Twitter profile",
  "instagram": "A link to your hackathon's Instagram profile",
  "linkedin": "A link to your hackathon's LinkedIn page",
  "twitch": "A link to your hackathon's Twitch stream",
  "youtube": "A link to your hackathon's YouTube channel",
  "devpost": "A link to your hackathon's Devpost page",
  "website": "A link to your hackathon's main website",
  "otherLinks": [
    {
      "linkTitle": "A description of the link. COMING SOON!",
      "link": "The link to go to. COMING SOON!"
    }
  ]
}
```

## organizers.json

TODO: Define a schema for listing organizers on the website

## volunteers.json

TODO: Define a schema for listing volunteers on the website

## mentors.json

TODO: Define a schema for listing mentors on the website

## judges.json

TODO: Define a schema for listing judges on the website

TODO: Determine if you want to include this information on the live site. There are arguements to be had both ways.
