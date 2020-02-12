const gitlab = require('node-gitlab');
const { GITLAB_API_URL, GITLAB_TOKEN } = require('./const');

const client = gitlab.create({
  api: GITLAB_API_URL,
  privateToken: GITLAB_TOKEN
});

const getUserByUsername = (username) => {
    return new Promise(resolve => {
        client.request('get', `/users?username=${username}`, {}, function (err, user) {
            resolve(user);
        });
    });
}

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
    getAllUsersOnDiscussion
}