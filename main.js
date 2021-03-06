const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();

app.use(express.static('dist'));
app.use(cors());

const GRAPH_URL = 'https://graph.facebook.com'
const APP_ID = process.env.FB_APP_ID;
const SECRET = process.env.FB_SECRET;
const CAFE_OTTIMO = 'ottimofood';
const PORT = process.env.PORT || 3000;

let access_token;

app.listen(PORT, () => {
    request(`${GRAPH_URL}/oauth/access_token?client_id=${APP_ID}&client_secret=${SECRET}&grant_type=client_credentials`, 
            (error, response, body) => {
                access_token = JSON.parse(body).access_token;
            });
    console.log(`Node server started at ${PORT}`);
})

app.get('/api/menus', (req, res) => {
    request(`${GRAPH_URL}/v2.9/${CAFE_OTTIMO}/feed?date_format=U&fields=attachments,message,created_time&access_token=${access_token}`, (error, response, body) => {
        res.send(body);
    })
    // res.send('only route');
})