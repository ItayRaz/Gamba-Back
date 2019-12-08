// 'use strict';

const eventoService = require('../evento/evento.service.js');
const utils = require('../../services/util.service.js');

module.exports = connectSockets;

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('joinRoom', roomName => {
            socket.join(roomName);
            socket.room = roomName;
        });
        socket.on('leaveRoom', roomName => {
            socket.leave(socket.room);
            socket.leave(roomName);
            // socket.room = null;
            delete socket.room;
        });

        socket.on('newComment', async ({comment, eventoId}) => {
            
            var commentToSend = await saveComment(comment, eventoId);
            io.to(socket.room).emit('addComment', {comment: commentToSend, room: socket.room});
            
            if (comment.txt === 'Gamba') {
                setTimeout( async () => {
                    var systemComment = await saveComment(getSystemComment('Pilpel'), eventoId);
                    io.to(socket.room).emit('addComment', {comment: systemComment, room: socket.room});
                }, 1000);
            }

            // io.to(socket.room).broadcast('addComment', comment);
        });

        socket.on('newEvento', evento => {
            io.to('all-clients').emit('EventoAdded', evento);
        })
    });
}

async function saveComment(comment, eventoId) {
    comment._id = utils.getRandomId();
    var evento = await eventoService.get(eventoId);
    if (!evento.comments) evento.comments = [];
    evento.comments.unshift(comment);
    await eventoService.save(evento);
    return comment;
}


function getSystemComment(txt) {
    return {
        txt,
        reviewer: {name: 'System', _id: 'System', img: ''},
        createdAt: Date.now()
    }
}