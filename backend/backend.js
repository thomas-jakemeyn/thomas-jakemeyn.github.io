'use strict';

/*
 This class is intended to be used as a backend mock.
 In a real environment, it would be a REST API exposed by an application server.
 */
export default class API {

    getProjects() {
        return this.promisify([{
            id: 0,
            title: 'scrum-light'
        }]);
    }

    getProject(projectId) {
        return this.promisify({
            id: projectId,
            title: 'scrum-light',
            sprints: [{
                id: 0,
                title: 'Sprint 1'
            }],
            backlog: [{
                id: 0,
                title: 'As a user, I want to see a basic SCRUM board',
                sprint: 0
            }, {
                id: 1,
                title: 'As a user, I want to create a new story'
            }]
        });
    }

    promisify(returnValue) {
        return new Promise(function (resolve) {
            resolve(returnValue);
        });
    }
}