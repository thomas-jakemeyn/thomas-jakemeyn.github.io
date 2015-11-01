'use strict';

import functions from 'functions';

class ProjectUtils {

    moveTaskToSprint(project, taskId, sprintId, beforeTaskId) {
        var task = this.findTask(project, taskId);
        task.sprint = sprintId;
    }

    findTask(project, taskId) {
        return project.backlog.find(task => task.id === taskId);
    }
}

export default functions.factoryOf(ProjectUtils);