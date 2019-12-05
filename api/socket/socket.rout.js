// 'use strict';

const eventoService = require('../evento/evento.service.js');
const utils = require('../../services/util.service.js');

module.exports = connectSockets;

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('newComment', async ({comment, eventoId}) => {
            
            comment._id = utils.getRandomId();
            console.log('new comment!', comment);
            var evento = await eventoService.get(eventoId);
            if (!evento.comments) evento.comments = [];
            evento.comments.unshift(comment);
            await eventoService.save(evento);

            io.to(socket.room).emit('addComment', {comment, room: socket.room});
            // io.to(socket.room).broadcast('addComment', comment);
        });
        socket.on('joinRoom', roomName => {
            socket.join(roomName);
            socket.room = roomName;
        });
        socket.on('leaveRoom', roomName => {
            socket.leave(socket.room);
            socket.leave(roomName);
            socket.room = null;
            delete socket.room;
            console.log('user left room', roomName);
        });
    });
}
