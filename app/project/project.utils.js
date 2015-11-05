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
        var tasks = project.tasks;
        var taskIndex = this.findTaskIndex(project, taskId);
        var task = tasks.splice(taskIndex, 1)[0];
        task.sprint = sprintId;
        this.insertNewTask(project, task, nextTaskId, sprintId);
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

    /**
     * Insert the given task in the given project.
     * <ul>
     *     <li>If both the next task and the sprint are defined, then the task is moved to the given sprint, before the given task.</li>
     *     <li>If the next task is defined but not the sprint, then the task is moved to the backlog, before the given task.</li>
     *     <li>If the sprint is defined but not the next task, then the task is moved to the end of the given sprint.</li>
     *     <li>If neither the sprint, neither the next task are defined, then the task is moved to the end of the backlog.</li>
     * </ul>
     *
     * @param {Object} project the project the task belongs to
     * @param {String} task the task that must be inserted
     * @param {String} [nextTaskId] the identifier of the next task
     * @param {String} [sprintId] the identifier of the sprint the task is moved to
     */
    insertNewTask(project, task, nextTaskId, sprintId) {
        var tasks = project.tasks;
        var toIndex = this.computeNewTaskIndex(project, nextTaskId, sprintId);
        tasks.splice(toIndex, 0, task);
    }

    computeNewTaskIndex(project, nextTaskId, sprintId) {
        if (!nextTaskId && sprintId) {
            var nextTask;
            var sprints = project.sprints;
            var sprintIndex = this.findSprintIndex(project, sprintId) + 1;
            while (sprintIndex < sprints.length && !nextTaskId) {
                nextTask = this.findFirstTaskOfSprint(project, sprints[sprintIndex].id);
                nextTaskId = nextTask ? nextTask.id : null;
                sprintIndex++;
            }
            if (!nextTaskId) {
                nextTask = this.findFirstTaskOfBacklog(project);
                nextTaskId = nextTask ? nextTask.id : null;
            }
        }
        return nextTaskId ? this.findTaskIndex(project, nextTaskId) : project.tasks.length;
    }

    completeSprint(project, sprintId) {
        var sprint = this.findSprint(project, sprintId);
        sprint.completed = true;

        var finalState = project.flow.states[project.flow.states.length - 1];
        var tasks = this.getTasksOfSprint(project, sprintId);
        tasks.reverse().forEach(task => {
            if (task.state === finalState) {
                var taskIndex = this.findTaskIndex(project, task.id);
                project.tasks.splice(taskIndex, 1);
                project.completed.unshift(task);
            } else {
                this.moveTaskToTopOfBacklog(project, task.id);
            }
        });
    }

    moveTaskToTopOfBacklog(project, taskId) {
        this.changeTaskPriority(project, taskId, this.findFirstTaskOfBacklog(project).id);
    }

    getSprints(project) {
        return project.sprints.filter(sprint => !sprint.completed);
    }

    getTasksOfBacklog(project) {
        return project.tasks.filter(task => !task.sprint);
    }

    getTasksOfSprint(project, sprintId) {
        return project.tasks.filter(task => task.sprint === sprintId);
    }

    findTask(project, taskId) {
        return project.tasks.find(task => task.id === taskId);
    }

    findTaskIndex(project, taskId) {
        return project.tasks.findIndex(task => task.id === taskId);
    }

    findFirstTaskOfSprint(project, sprintId) {
        return project.tasks.find(task => task.sprint === sprintId);
    }

    findFirstTaskOfBacklog(project) {
        return project.tasks.find(task => !task.sprint);
    }

    findSprint(project, sprintId) {
        return project.sprints.find(sprint => sprint.id === sprintId);
    }

    findSprintIndex(project, sprintId) {
        return project.sprints.findIndex(sprint => sprint.id === sprintId);
    }

    stringify(object) {
        return JSON.stringify(object, null, '\t');
    }
}

export default functions.factoryOf(ProjectUtils);