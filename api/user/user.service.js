'use strict';

const fs = require('fs');

const utils = require('../../services/util.service.js');


module.exports = {
    query,
    get,
    remove,
    save,
    login
}

function login({username, password}) {
    return _createUsers()
        .then(users => {
            var user = users.find(user => user.username === username && user.password === password);
            return new Promise((resolve, reject) => {
                if (user) resolve(user);
                else reject('not a valid user');
            })
        })
}


function get(_id) {
    return _createUsers()
        .then(users => {
            var user = users.find(user => user._id === _id);
            if (user) return Promise.resolve(user);
            else return Promise.reject('something went wrong');
        })
}

function save(user) {
    return _createUsers()
        .then(users => {
            if (user._id) {
                var idx = users.findIndex(currUser => currUser._id === user._id);
                if (idx !== -1) {
                    users.splice(idx, 1, user);
                }
            } else {
                if (users.find(currUser => currUser.username === user.username)) {
                    return Promise.reject('this user name is taken');
                }
                user._id = utils.getRandomId();
                users.unshift(user);
            }
            _saveUsersToFile(users);
            return Promise.resolve(user);
        })
}

function remove(_id) {
    return _createUsers()
        .then(users => {
            var idx = users.findIndex(user => user._id === _id);
            if (idx !== -1) {
                users.splice(idx, 1);
                _saveUsersToFile(users);
                return Promise.resolve(_id);
            }
            else return Promise.reject('user not found, could not delete');
        })
}

function query(filterBy = {}) {
    return _createUsers()
        .then(users => {
            return getUsersToSend(users, filterBy);
        })
        .catch(err => Promise.reject('could not get users'))
}

function getUsersToSend(users, filterBy = {}) {
    var usersToSend = [...users];
    if (filterBy.searchStr) usersToSend = usersToSend.filter(user => user.name.toLowerCase().includes(filterBy.searchStr.toLowerCase()));
    return usersToSend;
}

function _createUsers() {
    return _loadUsersFromFile()
        .then(users => {
            if (!users || users.length === 0) {
                users = _someUsers;
                _saveUsersToFile(users)
            };
            return users;
        })
}

function _saveUsersToFile(users) {
    fs.writeFileSync('data/user.json', JSON.stringify(users, null, 2));
}

function _loadUsersFromFile() {
    return Promise.resolve(require('../../data/user.json'));
}

var _someUsers = [
    {
        "username": "Aviv",
        "password": "12345",
        "_id": "12345",
        "isAdmin": true,
        "about": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum, fuga accusamus! A, repellendus, doloribus excepturi accusamus rem odit delectus consectetur minus distinctio voluptatibus pariatur veniam eligendi culpa esse nihil quis.",
        "img": "https://api.adorable.io/avatars/285/aviv.png",
        "createdAt": 1574952586961
      },
      {
        "username": "Paz",
        "password": "123",
        "_id": "123",
        "isAdmin": false,
        "img": "https://api.adorable.io/avatars/285/paz.png",
        "createdAt": 1574952586961
      },
      {
        "username": "Itai",
        "password": "1234",
        "_id": "1234",
        "isAdmin": false,
        "img": "https://api.adorable.io/avatars/285/itai.png",
        "createdAt": 1574952586961
      }
] 