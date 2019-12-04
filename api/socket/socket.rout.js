// 'use strict';

// const eventoService = require('../evento/evento.service.js');

module.exports = connectSockets;

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('newComment', async ({comment, eventoId}) => {
            io.to(socket.room).emit('addComment', comment);
            // io.to(socket.room).broadcast('addComment', comment);

            // console.log('new comment!', comment);
            // var evento = await eventoService.get(eventoId);
            // if (!evento.comments) evento.comments = [];
            // evento.comments.unshift(comment);
            // await eventoService.save(evento);
        })
        socket.on('joinRoom', roomName => {
            socket.join(roomName);
            socket.room = roomName;
        })
        socket.on('leaveRoom', roomName => {
            socket.leave(socket.room);
        })
    })
}