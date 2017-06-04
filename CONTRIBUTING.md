# How to Contribute to this Interview Curriculum

**The primary objective of these challenges is twofold:**
- **1) The challenge content should be very high quality.**
- **2) The challenges should cover topics that are commonly encountered in software engineering interviews.**

If anyone wants to contribute new material please be sure to have approval or reach out for approval from someone on the freeCodeCamp core team, or open an issue here and indicate you want to contribute. This is just to keep contributions organized. Thank you! If you want to contribute, read on.

If you're here to report a bug or problem, or have a question, please open an issue.

***

### Overview:

This project is a React application which serves all of the challenges from the `src/challenges` directory. There are 8 JavaScript files that contain the content for 8 categories, and an `index` file which exports all of this for the app to consume. If you are just modifying a question or adding a new one, you should only need to modify one of these 8 files.

To get the app running simply fork the repo to your machine and run `npm install` and then `npm start`. The app should then be running locally and should live-update for you. To contribute, try to follow the same guidelines which direct contributions to the core freeCodeCamp repository. See [here](https://github.com/freeCodeCamp/freeCodeCamp/blob/staging/CONTRIBUTING.md) or [here](https://github.com/freeCodeCamp/how-to-contribute-to-open-source/blob/master/CONTRIBUTING.md) for more details.

***

### Details:

**Take a look at any of the category files, e.g. `01_javascript.js`, to see how the challenge seed content is organized. It should be pretty self-explanatory, but we'll provide an overview here.**

First is an area to add any custom code snippets you're going to include in a challenge. We've isolated these into separate variables to avoid weird formatting and indentation issues, and we are bracketing them with `start` and `end` variables which contain the HTML `pre` and `code` tags necessary to display the snippets correctly. Currently, there are no naming requirements for these variables (do your best). After creating snippets you can just reference them inline in the challenge content below. You should be able to see how to do this by looking at the existing questions which include code snippets.

Following this is a commented out template object which presents the scaffold for each individual question. It looks like:

``` javascript
{
  title: "", // the title of the question
  subtitle: "", // a shorter subtitle used for URLs and metadata
  choices: [ // array of answer options, must be greater than 2
    "",
    "",
    "",
    ""
  ],
  solution: "", // index of the correct answer choice
  explanation: "" // explanation of the correct answer
},
```

For multiline code snippets you can use HTML `<pre></pre>` tags (and assign them as separate variables at the top of the file), for short code pieces you can use `<code></code>` tags.

Finally, an object is exported which represents the entire quiz data for this category. It includes a `title` and `category` and all the challenges. To add a new challenge question you simply take the template challenge from above, fill it in, and add it to the array of `challenges`.

The app will make some effort to verify that the categories and questions have sufficient content for the app to work, and if there are any problems you should see some messages in the browser console while running the app.

**While developing or modifying challenges, take a look at your question in the browser to verify everything looks good! When you're happy with your work, please submit a PR**.
