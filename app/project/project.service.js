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

    changeTaskPriority(project, taskId, nextTaskId, sprintId) {
        this.backend.changeTaskPriority(project.id, taskId, nextTaskId, sprintId).then(() => {
            this.projectUtils.changeTaskPriority(project, taskId, nextTaskId, sprintId);
        });
    }

    changeTaskState(project, taskId, stateId) {
        this.backend.changeTaskState(project.id, taskId, stateId).then(() => {
            this.projectUtils.changeTaskState(project, taskId, stateId);
        });
    }

    createTaskInBacklog(project, data) {
        var beforeTaskId = this.projectUtils.findFirstTaskIndexNotAssignedToSprint(project);
        data.beforeTaskId = beforeTaskId;
        this.backend.createTask(project.id, data).then(task => {
            this.projectUtils.insertNewTask(project, task, beforeTaskId);
        });
    }
}

export default ['backend', 'projectUtils', functions.factoryOf(ProjectService)];