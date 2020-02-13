require('dotenv').config()

const GITLAB_API_URL = process.env.GITLAB_API_URL;
const GITLAB_TOKEN = process.env.GITLAB_TOKEN;
const APP_PORT = process.env.APP_PORT || 3000;
const SLACK_TOKEN = process.env.SLACK_TOKEN;

module.exports = {
    GITLAB_API_URL,
    GITLAB_TOKEN,
    APP_PORT,
    SLACK_TOKEN
}