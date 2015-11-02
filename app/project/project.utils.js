'use strict';

import functions from 'functions';

class ProjectUtils {

    /**
     * Change the priority of the given task in the given project.
     * <ul>
     *     <li>If both the next task and the sprint are defined, then the task is moved to the given sprint, before the given task.</li>
     *     <li>If the next task is defined but not the sprint, then the task is moved to the backlog, before the given task.</li>
     *     <li>If the sprint is defined but not the next task, then the task is moved to the end of the given sprint.</li>
     *     <li>If neither the sprint, neither the next task are defined, then the task is moved to the end of the backlog.</li>
     * </ul>
     *
     * @param {Object} project the project the task belongs to
     * @param {String} taskId the identifier of the task whose priority must be changed
     * @param {String} [nextTaskId] the identifier of the next task
     * @param {String} [sprintId] the identifier of the sprint the task is moved to
     */
    changeTaskPriority(project, taskId, nextTaskId, sprintId) {
        // assign the task to the given sprint
        var task = this.findTask(project, taskId);
        task.sprint = sprintId;

        // compute the next task when the task is moved at the end of a sprint
        if (sprintId && !nextTaskId) {
            var sprints = project.sprints;
            var sprintIndex = this.findSprintIndex(project, sprintId) + 1;
            while (sprintIndex < sprints.length && !nextTaskId) {
                task = this.findFirstTaskOfSprint(project, sprints[sprintIndex].id);
                nextTaskId = task ? task.id : null;
                sprintIndex++;
            }
            if (!nextTaskId) {
                task = this.findFirstTaskNotAssignedToSprint(project);
                nextTaskId = task ? task.id : null;
            }
        }

        // move the task
        var tasks = project.backlog;
        var fromIndex = this.findTaskIndex(project, taskId);
        var toIndex = nextTaskId ? this.findTaskIndex(project, nextTaskId) : tasks.length - 1;
        tasks.splice(toIndex, 0, tasks.splice(fromIndex, 1)[0]);
    }

    /**
     * Change the state of the given task in the given project.
     *
     * @param {Object} project the project the task belongs to
     * @param {String} taskId the identifier of the task whose state must be changed
     * @param {String} stateId the identifier of the new state of the task
     */
    changeTaskState(project, taskId, stateId) {
        var task = this.findTask(project, taskId);
        task.state = stateId;
    }

    insertNewTask(project, task, beforeTaskId) {
        var tasks = project.backlog;
        var toIndex = beforeTaskId ? this.findTaskIndex(project, beforeTaskId) : tasks.length - 1;
        tasks.splice(toIndex, 0, task);
    }

    findTask(project, taskId) {
        return project.backlog.find(task => task.id === taskId);
    }

    findTaskIndex(project, taskId) {
        return project.backlog.findIndex(task => task.id === taskId);
    }

    findFirstTaskOfSprint(project, sprintId) {
        return project.backlog.find(task => task.sprint === sprintId);
    }

    findFirstTaskNotAssignedToSprint(project) {
        return project.backlog.find(task => !task.sprint);
    }

    findFirstTaskIndexNotAssignedToSprint(project) {
        return project.backlog.findIndex(task => !task.sprint);
    }

    findSprintIndex(project, sprintId) {
        return project.sprints.findIndex(sprint => sprint.id === sprintId);
    }
}

export default functions.factoryOf(ProjectUtils);