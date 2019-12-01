'use strict';

const fs = require('fs');

const utils = require('../../services/util.service.js');


module.exports = {
    query,
    get,
    remove,
    save,
}

// var gEventos;
// _createEventos();

function get(_id) {
    return _createEventos()
        .then(eventos => {
            var evento = eventos.find(evento => evento._id === _id);
            if (evento) return Promise.resolve(evento);
            else return Promise.reject('something went wrong');
        })
}

function save(evento) {
    return _createEventos()
        .then(eventos => {
            if (evento._id) {
                var idx = eventos.findIndex(currEvento => currEvento._id === evento._id);
                if (idx !== -1) {
                    eventos.splice(idx, 1, evento);
                }
            } else {
                evento._id = utils.getRandomId();
                eventos.unshift(evento);
            }
            _saveEventosToFile(eventos);
            return Promise.resolve(evento);

        })
}

function remove(_id) {
    return _createEventos()
        .then(eventos => {
            var idx = eventos.findIndex(evento => evento._id === _id);
            if (idx !== -1) {
                eventos.splice(idx, 1);
                _saveEventosToFile(eventos);
                return Promise.resolve(_id);
            }
            else return Promise.reject('evento not found, could not delete');
        })
}

function query(filterBy = {}) {
    return _createEventos()
        .then(eventos => {
            return getEventosToSend(eventos, filterBy);
        })
        .catch(err => Promise.reject('could not get eventos'))
}

function getEventosToSend(eventos, filterBy = {}) {
    var eventosToSend = [...eventos];
    
    if (filterBy.searchStr) eventosToSend = eventosToSend.filter(evento => evento.name.toLowerCase().includes(filterBy.searchStr.toLowerCase()));
    if (filterBy.creatorId) eventosToSend = eventosToSend.filter(evento => evento.creator._id === filterBy.creatorId);
    if (filterBy.memberId) eventosToSend = eventosToSend.filter(evento => evento.members.find(member => member._id === filterBy.memberId));

    return eventosToSend;
}

function _createEventos() {
    return _loadEventosFromFile()
        .then(eventos => {
            if (!eventos || eventos.length === 0) eventos = _someEventos;
            // gEventos = eventos;
            _saveEventosToFile(eventos)
            return eventos;
        })
}

function _saveEventosToFile(eventos) {
    fs.writeFileSync('data/evento.json', JSON.stringify(eventos, null, 2));
}

function _loadEventosFromFile() {
    return Promise.resolve(require('../../data/evento.json'));
}

var _someEventos = [
] 