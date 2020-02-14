/**
 * buildMergeRequestMessage is build message for merge request information
 * 
 * @param {Object} payload 
 * @return {string}
 */
const buildMergeRequestMessage = (payload, authorName="", assigneeName="") => {
    const state = payload.object_attributes.state;
    const title = payload.object_attributes.title;
    const description = payload.object_attributes.description || '-';
    const createdAt = payload.object_attributes.created_at;
    const url = payload.object_attributes.url;

    const template = `
[Merge Request *${state.toUpperCase()}*] \n
*${title}*
by *${authorName}* at ${createdAt}

Description: *${description}*
Link: ${url}
Reviewer: *${assigneeName}*
    `;
    
    return template;
}

/**
 * buildCommentMessageForOwner is build mesage for comment
 * 
 * @param {Object} payload 
 */
const buildCommentMessageForOwner = (payload, authorName="") => {
    const projectPath = payload.project.path_with_namespace;
    const description = payload.object_attributes.description || '-';
    const createdAt = payload.object_attributes.created_at;
    const url = payload.object_attributes.url;
    const mrTitle = payload.merge_request.title

    const template = `
[New Comment] 
on *${projectPath}*

Comment:
*${description}*
by *${authorName}* at ${createdAt}

Merge Request: *${mrTitle}*
Link: ${url}
    `;

    return template;
}

module.exports = {
    buildMergeRequestMessage,
    buildCommentMessageForOwner
}