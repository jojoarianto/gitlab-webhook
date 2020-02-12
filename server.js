const express = require('express');
const app = express();
const { getUserByUsername } = require('./gitlab');
const { APP_PORT } = require('./const');

app.get('/', (req, res) => res.send('Hello!'))
app.get('/healthz', (req, res) => res.send('Ok!'))

app.get('/gitlab/:username', async (req, res) => {
    const username = req.params ? req.params.username : '';
    const user = await getUserByUsername(username);

    res.send(user);
})

app.get('/slack/:username', async (req, res) => {
    const username = req.params ? req.params.username : '';
    const user = await getUserByUsername(username);

    res.send(user);
})

app.listen(APP_PORT, () => console.log(`App listening on port ${APP_PORT}!`))