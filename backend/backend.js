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
            title: 'Sprint 1: Bootstrapping',
            completed: true
        }, {
            id: this.generateId(),
            title: 'Sprint 2: Proof-of-Concept',
            completed: false
        }, {
            id: this.generateId(),
            title: 'Sprint 3: Minium Viable Product',
            completed: false
        }];
        var completed = [{
            id: this.generateId(),
            title: 'Gather requirements and create backlog (on a sheet of paper)',
            state: 'done',
            sprint: sprints[0].id
        }, {
            id: this.generateId(),
            title: 'Design domain model',
            state: 'done',
            sprint: sprints[0].id
        }, {
            id: this.generateId(),
            title: 'Create UI mockups',
            state: 'done',
            sprint: sprints[0].id
        }, {
            id: this.generateId(),
            title: 'Set up project structure, frameworks and libraries',
            state: 'done',
            sprint: sprints[0].id
        }];
        var tasks = [{
            id: this.generateId(),
            title: 'As a user, I want to see a basic SCRUM board',
            state: 'done',
            sprint: sprints[1].id
        }, {
            id: this.generateId(),
            title: 'As a user, I want to see the backlog and the sprints',
            state: 'done',
            sprint: sprints[1].id
        }, {
            id: this.generateId(),
            title: 'As a user, I want to create a new task',
            state: 'done',
            sprint: sprints[1].id
        }, {
            id: this.generateId(),
            title: 'As a user, I want to complete a sprint',
            state: 'resolved',
            sprint: sprints[1].id
        }, {
            id: this.generateId(),
            title: 'As a user, I want to create a sprint',
            state: 'toDo',
            sprint: sprints[2].id
        }, {
            id: this.generateId(),
            title: 'As a user, I want to create a project',
            state: 'toDo',
            sprint: sprints[2].id
        }, {
            id: this.generateId(),
            title: 'As a system, I want to persist projects',
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
            completed: completed,
            tasks: tasks,
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