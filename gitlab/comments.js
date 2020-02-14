const gitlab = require('./gitlab');
const slack = require('../slack/slack');
const { buildCommentMessageForOwner } = require("./helper");

/**
 * commentsOnMergeRequest is about handling comment event from gitlah
 * 
 * @param {Object} payload 
 */
const commentsOnMergeRequest = async (payload) => {
    // get mr author (gitlab)
    const mrAuthorId = payload.merge_request.author_id;
    const mrCreatorUser = await gitlab.getUserById(mrAuthorId);

    // get comment author (gitlab)
    const commentAuthorId = payload.object_attributes.author_id;
    const commentCreatorUser = await gitlab.getUserById(commentAuthorId);
    
    // build message
    const message = buildCommentMessageForOwner(payload, commentCreatorUser.name);
    
    // send message
    const res = await slack.sendMessageByEmail(mrCreatorUser.email, message);
    console.log(res);

    // if mr creator not comment then sent comment notif to mr creator
    if (!(mrCreatorUser.email === commentCreatorUser.email)) {
        const res2 = await slack.sendMessageByEmail(commentCreatorUser.email, message);
        console.log(res2);
    }

    // sent notif to all user in same discussion
    // tag people on comment

    return true;
}

module.exports = {
    commentsOnMergeRequest,
}