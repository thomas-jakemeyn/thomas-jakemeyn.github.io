'use strict';

import angular from 'angular';
import configureRouter from './project.router';
import projectServiceFactory from './project.service';
import projectUtilsFactory from './project.utils';
import ProjectListController from './list/project-list.controller';
import ProjectViewController from './view/project-view.controller';
import ProjectBacklogController from './view/backlog/project-backlog.controller';
import ProjectBoardController from './view/board/project-board.controller';
import CreateTaskFormController from './view/actions/create-task/create-task-form.controller';
import CompleteSprintFormController from './view/actions/complete-sprint/complete-sprint-form.controller';
import sprintActionsDirective from './view/actions/sprint-actions';

var name = 'project';

function configure() {
    angular.module(name, [])
            .config(configureRouter)
            .factory('projectService', projectServiceFactory)
            .factory('projectUtils', projectUtilsFactory)
            .controller('ProjectListController', ProjectListController)
            .controller('ProjectViewController', ProjectViewController)
            .controller('ProjectBacklogController', ProjectBacklogController)
            .controller('ProjectBoardController', ProjectBoardController)
            .controller('CreateTaskFormController', CreateTaskFormController)
            .controller('CompleteSprintFormController', CompleteSprintFormController)
            .directive(sprintActionsDirective.name, sprintActionsDirective.factory);
}

export default {
    name: name,
    configure: configure
};