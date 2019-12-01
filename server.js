'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'some secret sheet',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

const eventoRout = require('./api/evento/evento.rout.js');
const userRout = require('./api/user/user.rout.js');
const reviewRout = require('./api/review/review.rout.js');

app.use('/api/evento', eventoRout);
app.use('/api/user', userRout);
app.use('/api/review', reviewRout);

module.exports = app;