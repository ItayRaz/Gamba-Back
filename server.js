'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: 'some secret shit',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));




if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080','http://localhost:8080'],
        credentials: true
    };
    app.use(cors(corsOptions));
}
// const corsOptions = {
//     origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
//     credentials: true
// };
// app.use(cors(corsOptions));


const eventoRout = require('./api/evento/evento.rout.js');
const userRout = require('./api/user/user.rout.js');
const reviewRout = require('./api/review/review.rout.js');
const connectToSockets = require('./api/socket/socket.rout.js')

app.use('/api/evento', eventoRout);
app.use('/api/user', userRout);
app.use('/api/review', reviewRout);
connectToSockets(io);


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.resolve(__dirname, 'public')));
// }

// module.exports = app;
module.exports = http;