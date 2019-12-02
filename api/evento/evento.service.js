'use strict';

const dbService = require('../../services/db.service.js')
const ObjectId = require('mongodb').ObjectId;

const fs = require('fs');

const utils = require('../../services/util.service.js');


module.exports = {
    query,
    get,
    remove,
    save,
}

// var gEventos;
// _conectToCollection();

async function get(_id) {
    const collection = await  _conectToCollection()
    try {
        const evento = await collection.findOne({"_id":ObjectId(_id)})
        return evento
    } catch (err) {
        console.log(`ERROR: cannot find evento ${_id}`)
        throw err;
    }
        // .then(eventos => {
            // var evento = eventos.find(evento => evento._id === _id);
            // if (evento) return Promise.resolve(evento);
            // else return Promise.reject('something went wrong');
        // })
}

async function save(evento) {
    
    const collection = await  _conectToCollection()
    if (evento._id){
        try {
            evento._id = ObjectId(evento._id);
            await collection.updateOne({"_id":ObjectId(evento._id)}, {$set : evento})
            return evento
        } catch (err) {
            console.log(`ERROR: cannot update evento ${evento._id}`)
            throw err;
        }
    }
    try {
        console.log('evento');
        await collection.insertOne(evento);
        return evento;
    } catch (err) {
        console.log(`ERROR: cannot insert evento`)
        throw err;
    }
        // .then(eventos => {
        //     if (evento._id) {
        //         var idx = eventos.findIndex(currEvento => currEvento._id === evento._id);
        //         if (idx !== -1) {
        //             eventos.splice(idx, 1, evento);
        //         }
        //     } else {
        //         evento._id = utils.getRandomId();
        //         eventos.unshift(evento);
        //     }
        //     _saveEventosToFile(eventos);
        //     return Promise.resolve(evento);
        // })
}

async function remove(_id) {
    const collection = await  _conectToCollection();
    try {
        return await collection.deleteOne({"_id":ObjectId(_id)})
    } catch (err) {
        console.log(`ERROR: cannot remove evento ${_id}`)
        throw err;
    }
        // .then(eventos => {
        //     var idx = eventos.findIndex(evento => evento._id === _id);
        //     if (idx !== -1) {
        //         eventos.splice(idx, 1);
        //         _saveEventosToFile(eventos);
        //         return Promise.resolve(_id);
        //     }
        //     else return Promise.reject('evento not found, could not delete');
        // })
}

async function query(filterBy = {}) {    
    const collection = await _conectToCollection()
    try {
        const eventos = await collection.find(filterBy).toArray();
        console.log(eventos);
        
        return eventos
    } catch (err) {
        console.log('ERROR: cannot find eventos')
        throw err;
    }
        // .then(eventos => {
        //     return getEventosToSend(eventos, filterBy);
        // })
        // .catch(err => Promise.reject('could not get eventos'))
}

function getEventosToSend(eventos, filterBy = {}) {
    var eventosToSend = [...eventos];
    
    if (filterBy.searchStr) eventosToSend = eventosToSend.filter(evento => evento.name.toLowerCase().includes(filterBy.searchStr.toLowerCase()));
    if (filterBy.creatorId) eventosToSend = eventosToSend.filter(evento => evento.creator._id === filterBy.creatorId);
    if (filterBy.memberId) eventosToSend = eventosToSend.filter(evento => evento.members.find(member => member._id === filterBy.memberId));

    return eventosToSend;
}

async function _conectToCollection() {
    const collection = await dbService.getCollection('evento')
    console.log(collection);
    
    return collection;
    // return _loadEventosFromFile()
    //     .then(eventos => {
    //         if (!eventos || eventos.length === 0) {
    //             eventos = _someEventos
    //             _saveEventosToFile(eventos)
    //         };
    //         return eventos;
    //     })
}

// function _saveEventosToFile(eventos) {
//     fs.writeFileSync('data/evento.json', JSON.stringify(eventos, null, 2));
// }

// function _loadEventosFromFile() {
//     return Promise.resolve(require('../../data/evento.json'));
// }

// var _someEventos = [
// ] 