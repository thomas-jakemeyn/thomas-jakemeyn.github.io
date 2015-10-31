'use strict';

import angular from 'angular';
import configureRouter from './project.router';
import ProjectsController from './projects.controller';

var name = 'project';

function configure() {
    angular.module(name, [])
            .config(configureRouter)
            .controller('ProjectsController', ProjectsController);
}

export default {
    name: name,
    configure: configure
};