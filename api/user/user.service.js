'use strict';

const dbService = require('../../services/db.service.js');
const ObjectId = require('mongodb').ObjectId;


module.exports = {
    query,
    get,
    remove,
    save,
    login
}

async function login({username, password}) {
    // if (!username || !password) throw Error('meissing input');
    const collection = await _connectToCollection();
    try {
        var user = await collection.findOne({username, password});
        delete user.password;
        return user;
    } catch(err) {
        throw Error('not a valid user');
    }
}


async function get(_id) {
    const collection = await _connectToCollection();
    try {
        var user = collection.findOne({"_id":ObjectId(_id)});
        return user;
    } catch(err) {
        throw err
    }
}

async function save(user) {
    const collection = await _connectToCollection();

    if (user._id) {
        try {
            user._id = ObjectId(user._id);
            await collection.updateOne({"_id":ObjectId(user._id)}, {$set: user});
            return user;
        } catch(err) {
            throw err;
        }
    } else {
        // if (await collection.findOne({username: user.username})) throw Error('user name is already in use')
        try {
            return await collection.insertOne(user);
        } catch(err) {
            throw err;
        }
    }
}

async function remove(_id) {
    const collection = await _connectToCollection();
    try {
        return await collection.deleteOne({"_id":ObjectId(_id)});
    } catch(err) {
        throw err;
    }
}

async function query(filterBy = {}) {
    const collection = await _connectToCollection();
    try {
        var users = await collection.find({}).toArray();
        if (!users || !users.length) {
            await collection.insert(_someUsers)
            return await collection.find({}).toArray();
        }
        else return users;
    } catch(err) {
        throw err;
    }
}

// function getUsersToSend(users, filterBy = {}) {
//     var usersToSend = [...users];
//     if (filterBy.searchStr) usersToSend = usersToSend.filter(user => user.name.toLowerCase().includes(filterBy.searchStr.toLowerCase()));
//     return usersToSend;
// }


async function _connectToCollection() {
    return await dbService.getCollection('user');
}

var _someUsers = [
    {
        "username": "Aviv",
        "password": "12345",
        // "_id": "12345",
        "isAdmin": true,
        "about": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum, fuga accusamus! A, repellendus, doloribus excepturi accusamus rem odit delectus consectetur minus distinctio voluptatibus pariatur veniam eligendi culpa esse nihil quis.",
        "img": "https://api.adorable.io/avatars/285/aviv.png",
        "createdAt": 1574952586961
      },
      {
        "username": "Paz",
        "password": "123",
        // "_id": "123",
        "isAdmin": false,
        "img": "https://api.adorable.io/avatars/285/paz.png",
        "createdAt": 1574952586961
      },
      {
        "username": "Itai",
        "password": "1234",
        // "_id": "1234",
        "isAdmin": false,
        "img": "https://api.adorable.io/avatars/285/itai.png",
        "createdAt": 1574952586961
      }
] 