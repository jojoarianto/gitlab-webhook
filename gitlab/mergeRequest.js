const gitlab = require('./gitlab');
const slack = require('../slack/slack');

const mergeRequest = async (payload) => {
    // get assign / reviewer user (gitlab)
    const reviewerId = payload.object_attributes.assignee_id; 
    const reviewer = await gitlab.getUserById(reviewerId);

    // get mr author (gitlab)
    const authorId = payload.object_attributes.author_id;
    const user = await gitlab.getUserById(authorId);

    //  send message
    const res = await slack.sendMessageByEmail(reviewer.email, 'merge request open');
    const res2 = await slack.sendMessageByEmail(user.email, 'merge request open');

    // print log
    console.log(res);
    console.log(res2);

    return true;
}

module.exports = {
    mergeRequest
}