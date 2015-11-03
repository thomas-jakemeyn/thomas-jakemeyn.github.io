# scrum-light
[scrum-light](http://thomas-jakemeyn.github.io/) is an electronic SCRUM board that allows you to
* create projects
* define the stories which are in the backlog of a project and assign those stories to sprints
* change the state of stories during a sprint

This project is a proof-of-concept. It is a frontend application only, there is no backend.

The following technologies are used:
* EcmaScript 6, transpiled by Babel
* JSPM, for package management
* SystemJS, for module loading
* AngularJS, version 1
* ui-router, for routing
* dragula, for drag & drop

You can resolve the dependencies of the project by using the command hereunder. 
Note that the JSPM dependencies are checked in for the application to be hosted on GitHub Pages.
```
cd <scrum-light>
npm install && jspm install
```

You can serve the application locally by using the command hereunder.
```
cd <scrum-light>
gulp serve
```
