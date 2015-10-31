'use strict';

/*
 This class is intended to be used as a backend mock.
 In a real environment, it would be a REST API exposed by an application server.
 */
export default class API {

    getProjects() {
        return this.promisify([{
            title: 'SCRUM-light'
        }]);
    }

    promisify(returnValue) {
        return new Promise(function (resolve) {
            resolve(returnValue);
        });
    }
}