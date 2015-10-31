'use strict';

/*
 This class is intended to be used as a backend mock.
 In a real environment, it would be a REST API exposed by an application server.
 */
export default class API {

    getProjects() {
        return this.promisify([{
            id: 0,
            title: 'scrum-light'
        }]);
    }

    getProject(projectId) {
        return this.promisify({
            id: projectId,
            title: 'scrum-light'
        });
    }

    promisify(returnValue) {
        return new Promise(function (resolve) {
            resolve(returnValue);
        });
    }
}