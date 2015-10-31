'use strict';

import functions from 'functions';

class ProjectService {

    constructor(backend) {
        this.backend = backend;
    }

    getProjects() {
        return this.backend.getProjects();
    }
}

export default ['backend', functions.factoryOf(ProjectService)];