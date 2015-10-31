'use strict';

import angular from 'angular';
import configureRouter from './project.router';

var name = 'project';

function configure() {
    angular.module(name, [])
            .config(configureRouter);
}

export default {
    name: name,
    configure: configure
};