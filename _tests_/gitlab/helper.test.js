const { buildMergeRequestMessage } = require('./../../gitlab/helper');
const fs = require('fs');

test('build message mr should be oke', () => {
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