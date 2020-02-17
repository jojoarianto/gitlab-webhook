const gitlab = require('node-gitlab');
const { GITLAB_API_URL, GITLAB_TOKEN } = require('../const');
const axios = require('axios');
const constanta = require('../const');

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
 * getDiscussion get all user in spesific disscussion (comment)
 * 
 * @param {int} projectId 
 * @param {int} mergeRequestId 
 * @param {int} discussionId 
 */
const getDiscussion = async (projectId, mergeRequestId, discussionId) => {
    const url = `${GITLAB_API_URL}/projects/${projectId}/merge_requests/${mergeRequestId}/discussions/${discussionId}`;
    try {
        const response = await axios.get(url, { headers: { 'private-token': constanta.GITLAB_TOKEN } });
        if (response.status != 200) return null;

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    getUserByUsername,
    getDiscussion,
    getUserById
}