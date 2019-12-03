'use strict';

const dbService = require('../../services/db.service.js')
const ObjectId = require('mongodb').ObjectId;

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
        const evento = await collection.findOne({"_id":ObjectId(_id)});
        return evento;
    } catch (err) {
        throw Error('Could not get evento');
    }
}

async function save(evento) {
    
    const collection = await _conectToCollection()
    if (evento._id){
        try {
            evento._id = ObjectId(evento._id);
            await collection.updateOne({"_id":ObjectId(evento._id)}, {$set : evento})
            return evento
        } catch (err) {
            throw err;
        }
    }
    try {
        await collection.insertOne(evento);
        return evento;
    } catch (err) {
        throw err;
    }
}

async function remove(_id) {
    const collection = await  _conectToCollection();
    try {
        return await collection.deleteOne({"_id":ObjectId(_id)})
    } catch (err) {
        throw err;
    }
}

async function query(filterBy = {}) {    
    const collection = await _conectToCollection()
    try {
        return await collection.find({}).toArray();
    } catch (err) {
        throw err;
    }
}

// function getEventosToSend(eventos, filterBy = {}) {
//     var eventosToSend = [...eventos];
    
//     if (filterBy.searchStr) eventosToSend = eventosToSend.filter(evento => evento.name.toLowerCase().includes(filterBy.searchStr.toLowerCase()));
//     if (filterBy.creatorId) eventosToSend = eventosToSend.filter(evento => evento.creator._id === filterBy.creatorId);
//     if (filterBy.memberId) eventosToSend = eventosToSend.filter(evento => evento.members.find(member => member._id === filterBy.memberId));

//     return eventosToSend;
// }

async function _conectToCollection() {
    return await dbService.getCollection('evento');    
}

// var _someEventos = [
// ] 