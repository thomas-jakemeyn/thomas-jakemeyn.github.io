'use strict';

import API from 'backend';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mainBar from 'main-bar';
import project from 'project';
import board from 'board';
import 'bootstrap';

// Configure the main bar
mainBar.configure();

// Configure the project module
project.configure();

// Configure the board module
board.configure();

// Configure the main module
angular.module('main', ['ui.router', mainBar.name, project.name, board.name])
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