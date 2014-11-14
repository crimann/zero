A starting point to "jumpstart" a project which contains some of the things i wrote over and over again for each project.

Doesn't contain any styling, html structure or other project-related stuff. Its basically just my preferred document-structure and a pre-configured Gruntfile.js and package.json.

Nothing fancy, but still very useful for new projects.

# How To Use
1. Clone to a folder where you want to start a new project.
2. Go to package.json and replace the placeholders with your project name, description and version number.
3. Navigate to that folder in your terminal and type "npm install" to install the dependencies.
4. Type "grunt" to run the default grunt task (this will run "watch" task at the end)
5. Start Coding!

# Build Task
To finally deploy what you've built, there's a "build" Grunt Task. Running "grunt build" from the terminal will sync all relevant files to a new sub-folder (named as configured in the package.json) which you then can deploy or send to a client.