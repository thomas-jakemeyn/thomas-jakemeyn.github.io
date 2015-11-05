# Scrum Light
[Scrum Light](http://thomas-jakemeyn.github.io/) is a proof-of-concept of an electronic SCRUM board.
It is a frontend application only, there is no backend (and no persistence). Currently, it allows you to
* select an existing project (there is only one for the moment: *scrum-light-mvp*)
* view the tasks of that project, ordered by priority descending (sprint tasks, backlog tasks and completed tasks)
* change the priority of a task and assign it to a sprint (with drag & drop)
* add a new task to the backlog or to a sprint
* view the progress of the development in a SCRUM board with 4 lanes: *to do*,  *in progress*, *resolved*, *done* (the states are configurable per project)
* update the progress by changing the status of a task in the SCRUM board (with drag & drop, the transitions are configurable per project)
* complete a sprint (the tasks which are not yet completed are sent back to the top of the backlog, they keep their current state)

The following technologies are used:
* [EcmaScript 6](http://es6-features.org/), transpiled by Babel
* [JSPM](http://jspm.io/), for package management
* [SystemJS](https://github.com/systemjs/systemjs), for module loading
* [AngularJS](https://angularjs.org/), version 1
* [ui-router](https://github.com/angular-ui/ui-router), for routing
* [ui-bootstrap](https://angular-ui.github.io/bootstrap/), for UI components
* [dragula](https://github.com/bevacqua/angular-dragula), for drag & drop

For local development, you will have to install the following tools.
* [NodeJS](https://nodejs.org/en/), because [NPM](https://www.npmjs.com/) is needed to resolve some dependencies 
* [jspm-cli](https://github.com/jspm/jspm-cli), for package management (*npm install jspm -g*)
* [gulp](http://gulpjs.com/), for serving the project (*npm install gulp -g*)

Once you have installed the development tools, you can resolve the dependencies of the project by using the command 
hereunder. Note that the JSPM dependencies are checked in for the application to be served by 
[GitHub Pages](https://pages.github.com/).
```
cd <scrum-light>
npm install && jspm install
```

Once the dependencies of the project have been resolved, you can serve the application by using the command hereunder.
```
cd <scrum-light>
gulp serve
```