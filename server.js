const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const gitlab = require('./gitlab/gitlab');
const slack = require('./slack/slack');
const { mergeRequest } = require('./gitlab/mergeRequest');
const { commentsOnMergeRequest } = require('./gitlab/comments');
const { APP_PORT } = require('./const');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello!'))
app.get('/healthz', (req, res) => res.send('Ok!'))

app.post('/webhook', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const event = req.header('X-Gitlab-Event');

    // logging
    console.log(event);
    console.log(JSON.stringify(req.body));

    if (event === 'Merge Request Hook') {
        const result = await mergeRequest(req.body);
        res.send({data: result});
        return;
    }

    if (event === 'Note Hook') {
        const result = await commentsOnMergeRequest(req.body);
        res.send({data: result});
        return;
    }
})

// app.listen(APP_PORT, () => console.log(`App listening on port ${APP_PORT}!`));

// Set our GCF handler to our Express app.
module.exports.webhook = app;