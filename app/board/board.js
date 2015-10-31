'use strict';

import angular from 'angular';
import configureRouter from './board.router';

var name = 'board';

function configure() {
    angular.module(name, [])
            .config(configureRouter);
}

export default {
    name: name,
    configure: configure
};