'use strict';

export default function ($stateProvider) {
    $stateProvider
            .state('board-list', {
                url: '/boards',
                templateUrl: 'app/board/board-list.html'
            });
}