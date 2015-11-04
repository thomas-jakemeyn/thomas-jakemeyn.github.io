'use strict';

import functions from 'functions';
import uuid from 'uuid';

/*
 This class is intended to be used as a backend mock.
 In a real environment, it would be a REST API exposed by an application server.
 */
class API {

    constructor(projectUtils) {
        this.projectUtils = projectUtils;
    }

    getProjects() {
        return this.promisify([{
            id: this.generateId(),
            title: 'scrum-light-mvp'
        }]);
    }

    getProject(projectId) {
        var sprints = [{
            id: this.generateId(),
            title: 'Sprint 1',
            completed: false
        }, {
            id: this.generateId(),
            title: 'Sprint 2',
            completed: false
        }];
        var tasks = [{
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
                toDo: ['toDo', 'inProgress'],
                inProgress: ['toDo', 'inProgress', 'resolved'],
                resolved: ['toDo', 'inProgress', 'resolved', 'done'],
                done: ['done', 'toDo']
            }
        };
        return this.promisify({
            id: projectId,
            title: 'scrum-light-mvp',
            sprints: sprints,
            tasks: tasks,
            completed: [],
            flow: flow
        });
    }

    changeTaskPriority(projectId, taskId, nextTaskId, sprintId) {
        return new Promise(resolve => {
            // TODO find project and use projectUtils
            resolve();
        });
    }

    changeTaskState(projectId, taskId, stateId) {
        return new Promise(resolve => {
            // TODO find project and use projectUtils
            resolve();
        });
    }

    createTask(projectId, data, nextTaskId, sprintId) {
        return new Promise(resolve => {
            var task = {
                id: this.generateId(),
                title: data.title,
                state: 'toDo',
                sprint: sprintId
            };
            // TODO find project and use projectUtils
            resolve(task);
        });
    }

    completeSprint(projectId, sprintId) {
        return new Promise(resolve => {
            // TODO find project and use projectUtils
            resolve();
        });
    }

    promisify(returnValue) {
        return new Promise(resolve => {
            var serialized = this.serialize(returnValue);
            resolve(serialized);
        });
    }

    serialize(object) {
        return JSON.parse(JSON.stringify(object));
    }

    generateId() {
        return uuid.v4();
    }
}

export default ['projectUtils', functions.factoryOf(API)];