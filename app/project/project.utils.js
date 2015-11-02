'use strict';

import functions from 'functions';

class ProjectUtils {

    moveTaskToSprint(project, taskId, sprintId, beforeTaskId) {
        var task = this.findTask(project, taskId);
        task.sprint = sprintId;

        if (sprintId && !beforeTaskId) {
            var sprints = project.sprints;
            var sprintIndex = this.findSprintIndex(project, sprintId) + 1;
            while (sprintIndex < sprints.length && !beforeTaskId) {
                task = this.findFirstTaskForSprint(project, sprints[sprintIndex].id);
                beforeTaskId = task ? task.id : null;
                sprintIndex++;
            }
        }
        this.moveTask(project, taskId, beforeTaskId);
    }

    moveTaskToState(project, taskId, stateId) {
        var task = this.findTask(project, taskId);
        task.state = stateId;
    }

    moveTask(project, taskId, beforeTaskId) {
        var tasks = project.backlog;
        var fromIndex = this.findTaskIndex(project, taskId);
        var toIndex = beforeTaskId ? this.findTaskIndex(project, beforeTaskId) : tasks.length - 1;
        tasks.splice(toIndex, 0, tasks.splice(fromIndex, 1)[0]);
    }

    findTask(project, taskId) {
        return project.backlog.find(task => task.id === taskId);
    }

    findTaskIndex(project, taskId) {
        return project.backlog.findIndex(task => task.id === taskId);
    }

    findFirstTaskForSprint(project, sprintId) {
        return project.backlog.find(task => task.sprint === sprintId);
    }

    findSprintIndex(project, sprintId) {
        return project.sprints.findIndex(sprint => sprint.id === sprintId);
    }
}

export default functions.factoryOf(ProjectUtils);