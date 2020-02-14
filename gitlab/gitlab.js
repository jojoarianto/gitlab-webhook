const gitlab = require('node-gitlab');
const { GITLAB_API_URL, GITLAB_TOKEN } = require('../const');

const client = gitlab.create({
  api: GITLAB_API_URL,
  privateToken: GITLAB_TOKEN
});

/**
 * getUserByUsername get single user by it's username
 * 
 * @param {string} username 
 * @return {Object} user
 */
const getUserByUsername = (username) => {
    return new Promise(resolve => {
        client.request('get', `/users?username=${username}`, {}, function (err, user) {
            resolve(user);
        });
    });
}

/**
 * getUserById get single user by it's id
 * 
 * @param {int} id 
 * @return {Object} user
 */
const getUserById = (id) => {
    return new Promise(resolve => {
        client.request('get', `/users/${id}`, {}, function (err, user) {
            resolve(user);
        });
    });
}

/**
 * getAllUsersOnDiscussion get all user in spesific disscussion (comment)
 * 
 * @param {int} projectId 
 * @param {int} mergeRequestId 
 * @param {int} discussionId 
 */
const getAllUsersOnDiscussion = (projectId, mergeRequestId, discussionId) => {
    const url = `${GITLAB_API_URL}/projects/${projectId}/merge_requests/${mergeRequestId}/discussions/${discussionId}`;
    return new Promise(resolve => {
        client.request('get', url, {}, function (err, users) {
            resolve(users);
        });
    });
}

module.exports = {
    getUserByUsername,
    getAllUsersOnDiscussion,
    getUserById
}