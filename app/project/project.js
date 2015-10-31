'use strict';

import angular from 'angular';
import configureRouter from './project.router';
import ProjectServiceFactory from './project.service';
import ProjectListController from './project-list.controller';

var name = 'project';

function configure() {
    angular.module(name, [])
            .config(configureRouter)
            .factory('projectService', ProjectServiceFactory)
            .controller('ProjectListController', ProjectListController);
}

export default {
    name: name,
    configure: configure
};