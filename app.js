'use strict';

import API from 'backend';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularDragula from 'angular-dragula';
import mainBarModule from 'main-bar';
import projectModule from 'project';
import 'bootstrap';

mainBarModule.configure();
projectModule.configure();
angular.module('main', ['ui.router', angularDragula(angular), mainBarModule.name, projectModule.name])
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