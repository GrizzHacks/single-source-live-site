# Getting Started with Single Source

In this document, we'll go though how to to set up your own live site using Single Source!

## 1. Fork and Clone the Repo

The first step to deploy your own version of Single Source is to create your own repo.

1. Pressing the `Fork` button in the upper right hand corner of [https://github.com/andrewdimmer/single-source](https://github.com/andrewdimmer/single-source).
2. Using the Git client of your choice (GitBash, GitHub Desktop, GitKraken, etc.) clone your newly forked repo to your computer.
3. From the command line, change your terminal directory to `website`
4. Run `npm install` to install all of the required dependancies (check out [https://www.npmjs.com/](https://www.npmjs.com/) for more info on npm)

## 2. Update the `public` Folder

### 2.1 Edit the Page Title

First, let's update the page title. This is displayed as the name of the site in the browser tab.

1. Open `website/public/index.html`
2. On line 27, replace `React App` with the title of your website. (Example: "[Hackathon Name] Live")
3. Save the `index.html` file

### 2.2 Edit the Favicon

Now, let's update the favicon of the website. This is the icon that is displayed next to the name of your website in the browser tab.

1. Turn your logo into a .ico file (via an online convert), and name it `favicon.ico`
2. Copy your `favicon.ico` file into the `website/public` directory
3. Overwrite the existing `favicon.ico` file

## 3. Update the Live Data

Next, let's update all of the data for your hackathon! This is all controlled by the various `.json` files within the `website/src/Data` directory, then we can preview all of the changes locally.

1. Read about the data structure in `docs/dataStructure.md`
2. Using that data, update all of the documents within the `website/src/Data` directory with the information for your hackathon
3. Save all of the files that you have modified
4. From the command line, change your terminal directory to `website`
5. Run `npm run start` to open a preview of your live site at [http://localhost:3000](localhost:3000) (check out [https://www.npmjs.com/](https://www.npmjs.com/) for more info on npm)
6. Click the "Debug" icon in the lower right and corner of the preview website
7. Based on the debug data give, repeat steps 1-3 until you have resolved all of the bugs that you wish to (the preview should update each time you save)
8. When you're done with the local preview, use `^c` to stop the preview

## 4. Deploy your live site

Next, you can host your live site on any platform.

TODO: Add documentation for hosting on GitHub Pages and Firebase
