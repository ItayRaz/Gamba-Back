'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

// app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: 'some secret shit',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080'],
        credentials: true
    };
    app.use(cors(corsOptions));
}
app.use(express.static(path.resolve(__dirname, 'public')));





const eventoRout = require('./api/evento/evento.rout.js');
const userRout = require('./api/user/user.rout.js');
const reviewRout = require('./api/review/review.rout.js');
const connectToSockets = require('./api/socket/socket.rout.js')

app.use('/api/evento', eventoRout);
app.use('/api/user', userRout);
app.use('/api/review', reviewRout);
connectToSockets(io);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    // console.log(path);

})


// require('dotenv').config({ path: 'variables.env' });
// const webPush = require('web-push');

// const publicVapidKey = process.env.PUBLIC_VAPID_KEY;    //'PUBLIC_VAPID_KEY'
// const privateVapidKey = process.env.PRIVATE_VAPID_KEY;    //'PRIVATE_VAPID_KEY'

// console.log(webPush['generate-vapid-keys']);

// webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

// app.post('/sabscribe', (req, res) => {
//     res.status(201).json({});

//     webPush(sendNotification(req.nody, JSON.stringify({
//         title: 'title'
//     }))).catch(console.log);
// })


module.exports = http;