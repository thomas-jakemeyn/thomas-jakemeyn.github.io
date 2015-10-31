'use strict';

export default function configureRouter($stateProvider) {
    $stateProvider
            .state('boards', {
                url: '/boards',
                templateUrl: 'app/board/boards.html'
            });
}