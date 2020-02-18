const gitlab = require('./gitlab');
const slack = require('../slack/slack');
const { buildCommentMessageForOwner } = require("./helper");

/**
 * commentsOnMergeRequest is about handling comment event from gitlah
 * @param {Object} payload 
 */
const commentsOnMergeRequest = async (payload) => {
    // build message
    const commentAuthorId = payload.object_attributes.author_id;
    const commentCreatorUser = await gitlab.getUserById(commentAuthorId);
    const message = buildCommentMessageForOwner(payload, commentCreatorUser.name);

    // sent notif to mr creator.
    await sentNotifToMrCreator(payload, message);
    
    // sent notif to mentioned user
    await sentNotifToMentioned(payload, message);
    
    // sent notif to all user in same discussion
    await sentNotifToAllUserOnDiscussion(payload, message);

    return true;
}

/**
 * sentNotifToMrCreator action to sent notification to mr creator
 * 
 * @param {Object} payload 
 * @param {String} message 
 */
const sentNotifToMrCreator = async (payload, message) => {
    // get comment author (gitlab)
    const commentAuthorId = payload.object_attributes.author_id;
    const commentCreatorUser = await gitlab.getUserById(commentAuthorId);

    // get mr author (gitlab)
    const mrAuthorId = payload.merge_request.author_id;
    const mrCreatorUser = await gitlab.getUserById(mrAuthorId);
    
    // send message
    const res = await slack.sendMessageByEmail(mrCreatorUser.email, message);
    console.log(res);

    // if mr creator not comment then sent comment notif to mr creator
    if (!(mrCreatorUser.email === commentCreatorUser.email)) {
        const res2 = await slack.sendMessageByEmail(commentCreatorUser.email, message);
        console.log(res2);
    }
};

/**
 * sentNotifToAllUserOnDiscussion action to sending notification
 * 
 * @param {Object} payload 
 * @param {String} message 
 */
const sentNotifToAllUserOnDiscussion = async (payload, message) => {
    const discussionId = payload.object_attributes.discussion_id;
    const projectId = payload.project_id;
    const mergeRequestId = payload.merge_request.iid;
    
    // call get 
    const data = await gitlab.getDiscussion(projectId, mergeRequestId, discussionId);
    const notes = data.notes;
    
    let usersEmail = [];

    if (notes == undefined || notes == null) return false;

    // get user email from array of notes
    for (const comment of notes) {
        const authorId = comment.author.id;
        const user = await gitlab.getUserById(authorId);
        
        if (user) usersEmail.push(user.email);
    }

    // delete duplicate email on usersEmail 
    usersEmail = usersEmail.filter(_onlyUnique);
    console.log(usersEmail);
    
    await slack.sendMessageByEmails(usersEmail, message);
    return true;
};

/**
 * sentNotifToMentioned is about sent notif to mentioned user
 * @param {Object} payload 
 */
const sentNotifToMentioned = async (payload, message) => {
    const desc = payload.object_attributes.description;
    let usernames = _extractUsername(desc);
    usernames = usernames.filter(_onlyUnique);

    const emails = [];
    for (let username of usernames) {
        username = username.substr(1);
        const user = await gitlab.getUserByUsername(username);

        if (user[0].email !== undefined) {
            emails.push(user[0].email);
        }
    }

    // adjust message
    message = message.replace('[New Comment]', '[Youre Tagged in New Comment]');

    // sent notif
    console.log("sending message to ", emails);
    await slack.sendMessageByEmails(emails, message);

    return true;
};

const _extractUsername = (desc) => {
    return desc.match(/@\w*/g);
};

const _onlyUnique = (value, index, self) => { 
    return self.indexOf(value) === index;
}

module.exports = {
    commentsOnMergeRequest,
    _extractUsername,
}