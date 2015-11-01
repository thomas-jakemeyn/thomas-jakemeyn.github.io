'use strict';

import uuid from 'uuid';

/*
 This class is intended to be used as a backend mock.
 In a real environment, it would be a REST API exposed by an application server.
 */
export default class API {

    getProjects() {
        return this.promisify([{
            id: this.generateId(),
            title: 'scrum-light-mvp'
        }]);
    }

    getProject(projectId) {
        var sprints = [{
            id: this.generateId(),
            title: 'Sprint 1'
        }, {
            id: this.generateId(),
            title: 'Sprint 2'
        }];
        var backlog = [{
            id: this.generateId(),
            title: 'As a user, I want to see a basic SCRUM board',
            state: 'toDo',
            sprint: sprints[0].id
        }, {
            id: this.generateId(),
            title: 'As a user, I want to create a new story',
            state: 'toDo'
        }];
        var flow = {
            states: ['toDo', 'inProgress', 'resolved', 'done'],
            transitions: {
                toDo: ['inProgress'],
                inProgress: ['resolved'],
                resolved: ['done'],
                done: ['toDo']
            }
        };
        return this.promisify({
            id: projectId,
            title: 'scrum-light-mvp',
            backlog: backlog,
            sprints: sprints,
            flow: flow
        });
    }

    promisify(returnValue) {
        return new Promise(function (resolve) {
            resolve(returnValue);
        });
    }

    generateId() {
        return uuid.v1();
    }
}