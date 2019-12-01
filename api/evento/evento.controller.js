'use strict';

const eventoService = require('./evento.service.js');

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}

function query(req, res) {
    eventoService.query(req.query)
        .then(eventos => {
            res.json(eventos)})
        .catch(err => res.status(500).send(err));
}

function getById(req, res) {
    var _id = req.params._id;
    eventoService.get(_id)
        .then(evento => res.json(evento))
        .catch(err => res.status(500).send(err));
}

function add(req, res) {
    var evento = req.body;
    var user = req.session.loggedUser;
    console.log('adding evento,', req.session);
    evento.creatorId = (user)? user._id : 'guest';
    eventoService.save(evento)
        .then(evento => res.json(evento))
        .catch(err => res.status(500).send(err));
}

function update(req, res) {
    var evento = req.body;
    eventoService.save(evento)
        .then(evento => res.json(evento))
        .catch(err => res.status(500).send(err));
}

function remove(req, res) {
    var _id = req.params._id;
    eventoService.remove(_id)
        .then(evento => res.json(evento))
        .catch(err => res.status(500).send(err));
}