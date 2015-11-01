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

    moveTaskToSprint(project, taskId, sprintId, beforeTaskId) {
        this.backend.moveTaskToSprint(project.id, taskId, sprintId, beforeTaskId).then(() => {
            this.projectUtils.moveTaskToSprint(project, taskId, sprintId, beforeTaskId);
        });
    }

    moveTaskToState(project, taskId, stateId, beforeTaskId) {
        this.backend.moveTaskToState(project.id, taskId, stateId, beforeTaskId).then(() => {
            this.projectUtils.moveTaskToState(project, taskId, stateId, beforeTaskId);
        });
    }
}

export default ['backend', 'projectUtils', functions.factoryOf(ProjectService)];