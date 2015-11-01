'use strict';

import functions from 'functions';

class ProjectUtils {

    moveTaskToSprint(project, taskId, sprintId, beforeTaskId) {
        var task = this.findTask(project, taskId);
        task.sprint = sprintId;
        this.moveTask(project, taskId, beforeTaskId);
    }

    moveTask(project, taskId, beforeTaskId) {
        var task = this.findTask(project, taskId);
        var beforeTask = beforeTaskId ? this.findTask(project, beforeTaskId) : null;
        var tasks = project.backlog;
        var fromIndex = tasks.indexOf(task);
        var toIndex = beforeTask ? tasks.indexOf(beforeTask) : tasks.length - 1;
        tasks.splice(toIndex, 0, tasks.splice(fromIndex, 1)[0]);
    }

    findTask(project, taskId) {
        return project.backlog.find(task => task.id === taskId);
    }
}

export default functions.factoryOf(ProjectUtils);