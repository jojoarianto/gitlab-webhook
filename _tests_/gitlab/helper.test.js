const { buildMergeRequestMessage, buildCommentMessageForOwner } = require('./../../gitlab/helper');
const { _extractUsername } = require('./../../gitlab/comments');
const fs = require('fs');

test('build message mr should be okay', () => {
    const rawdata = fs.readFileSync('./dummy/merge-request.json');
    const payload = JSON.parse(rawdata);

    expect(buildMergeRequestMessage(payload)).toBe(`
[Merge Request *OPENED*] 

*MS-Viewport*
by ** at 2013-12-03T17:23:34Z

Description: *-*
Link: http://example.com/diaspora/merge_requests/1
Reviewer: **
    `);
});


test('build message comment should be oke', () => {
    const rawdata = fs.readFileSync('./dummy/comment.json');
    const payload = JSON.parse(rawdata);

    expect(buildCommentMessageForOwner(payload)).toBe(`
[New Comment] 
on *jojo/slack-incoming-hook*

Comment:
*kok ini gini?*
by ** at 2020-02-13 13:54:47 UTC

Merge Request: *ABC-1 add docs*
Link: https://gitlab.example.com/jojo/slack-incoming-hook/merge_requests/1#note_70460
    `);
});

test('extract username on comment should correct', () => {
    const actual = _extractUsername("@jon mas sorry ya. ini cuman buat testing wkwk. testing ngetag orang");
    expect(actual).toStrictEqual(["@jon"]);
})