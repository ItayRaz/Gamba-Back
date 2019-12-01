'use strict';

const server = require('./server.js');
const port = process.env.PORT || 3030;

server.listen(port, () => console.log('Listening to port: ', port));