const { WebClient } = require('@slack/web-api');
const { SLACK_TOKEN } = require('./const');

const token = SLACK_TOKEN;
const web = new WebClient(token);

/**
 * sendMessage is about sending message to slack via bot
 * 
 * @param {string} conversationId 
 * @param {string} msg 
 * See: https://api.slack.com/methods/chat.postMessage
 */
const sendMessage = async (conversationId, msg) => {
    const res = await web.chat.postMessage({ channel: conversationId, text: msg });
    return res;
}

/**
 * getUserByEmail is about get user by email
 * 
 * @param {string} email 
 * See: https://api.slack.com/methods/users.lookupByEmail
 */
const getUserByEmail = async (email) => {
  try {
    const res = await web.users.lookupByEmail({ email: email });
    return res.ok ? res.user : null;
  } catch (error) {
     console.log(error);
    return null;
  }
}

module.exports = {
  getUserByEmail,
  sendMessage
}
