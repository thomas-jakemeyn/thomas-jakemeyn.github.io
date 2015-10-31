'use strict';

import angular from 'angular';
import configureRouter from './project.router';
import ProjectServiceFactory from './project.service';
import ProjectListController from './list/project-list.controller';
import ProjectViewController from './view/project-view.controller';

var name = 'project';

function configure() {
    angular.module(name, [])
            .config(configureRouter)
            .factory('projectService', ProjectServiceFactory)
            .controller('ProjectListController', ProjectListController)
            .controller('ProjectViewController', ProjectViewController);
}

export default {
    name: name,
    configure: configure
};