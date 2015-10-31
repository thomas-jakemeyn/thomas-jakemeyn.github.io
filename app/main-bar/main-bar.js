'use strict';

import angular from 'angular';
import directive from './main-bar.directive';

var name = 'mainBar';

function configure() {
    angular.module(name, [])
            .directive('mainBar', directive);
}

export default {
    name: name,
    configure: configure
};