'use strict';

import functions from 'functions';

class ProjectService {

    constructor(backend, projectUtils) {
        this.backend = backend;
        this.projectUtils = projectUtils;
    }

    getProjects() {
        return this.backend.getProjects();
    }

    getProject(projectId) {
        return this.backend.getProject(projectId);
    }

    getTasksOfBacklog(project) {
        return this.projectUtils.getTasksOfBacklog(project);
    }

    getTasksOfSprint(project, sprintId) {
        return this.projectUtils.getTasksOfSprint(project, sprintId);
    }

    changeTaskPriority(project, taskId, nextTaskId, sprintId) {
        return this.backend.changeTaskPriority(project.id, taskId, nextTaskId, sprintId).then(() => {
            this.projectUtils.changeTaskPriority(project, taskId, nextTaskId, sprintId);
        });
    }

    changeTaskState(project, taskId, stateId) {
        return this.backend.changeTaskState(project.id, taskId, stateId).then(() => {
            this.projectUtils.changeTaskState(project, taskId, stateId);
        });
    }

    createTask(project, data, nextTaskId, sprintId) {
        return this.backend.createTask(project.id, data, nextTaskId, sprintId).then(task => {
            this.projectUtils.insertNewTask(project, task, nextTaskId, sprintId);
        });
    }
}

export default ['backend', 'projectUtils', functions.factoryOf(ProjectService)];