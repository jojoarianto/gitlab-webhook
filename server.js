const express = require('express');
const app = express();
const gitlab = require('./gitlab');
const slack = require('./slack');
const { APP_PORT } = require('./const');

app.get('/', (req, res) => res.send('Hello!'))
app.get('/healthz', (req, res) => res.send('Ok!'))

app.get('/gitlab/findByUsername/:username', async (req, res) => {
    const username = req.params ? req.params.username : '';
    const user = await gitlab.getUserByUsername(username);

    res.send(user);
})

app.get('/slack/findByEmail/:email', async (req, res) => {
    const email = req.params ? req.params.email : '';
    const user = await slack.getUserByEmail(email);

    res.send(user);
})



app.listen(APP_PORT, () => console.log(`App listening on port ${APP_PORT}!`))