'use strict';

import functions from 'functions';

class ProjectUtils {

    findTask(project, taskId) {
        return project.backlog.find(task => task.id === taskId);
    }
}

export default functions.factoryOf(ProjectUtils);