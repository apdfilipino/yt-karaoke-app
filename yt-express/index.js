const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { search } = require("./yt-api");

const PORT_NUMBER = 1026;

app.use(bodyParser.json());

app.get('/results', async (req, res) => {
    const { search_query } = req.query;
    const response = await search(search_query);
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.json(response);
});

app.listen(PORT_NUMBER, () => {
    console.log(`Listening at ${PORT_NUMBER}`);
})