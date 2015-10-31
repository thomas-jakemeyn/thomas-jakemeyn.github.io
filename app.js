'use strict';

import API from 'backend';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mainBarModule from 'main-bar';
import projectModule from 'project';
import boardModule from 'board';
import 'bootstrap';

mainBarModule.configure();
projectModule.configure();
boardModule.configure();
angular.module('main', ['ui.router', mainBarModule.name, projectModule.name, boardModule.name])
        .factory('backend', function () {
            return new API();
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('projects');
        });

// Bootstrap Angular
angular.element(document).ready(function () {
    angular.bootstrap(document, ['main']);
});