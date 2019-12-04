'use strict';

const userService = require('./user.service.js');

module.exports = {
    query,
    getById,
    update,
    remove,
    signin,
    login,
    logout
}

function query(req, res) {
    userService.query()
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err));
}

function getById(req, res) {
    var _id = req.params._id;
    userService.get(_id)
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err));
}

function signin(req, res) {
    var user = req.body;
    userService.save(user)
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err));
}

function update(req, res) {
    var user = req.body;
    userService.save(user)
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err));
}

function remove(req, res) {
    var _id = req.params._id;
    userService.remove(_id)
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err));
}

function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    if (!username || !password) res.status(404).send('missing input');
    
    userService.login({username, password})
        .then(user => {
            req.session.loggedUser = user;
            res.json(user);
        })
        .catch(err => {
            res.status(404).send('user not found');
        })
}

function logout(req, res) {
    var user = req.session.loggedUser;
    req.session.loggedUser = null;
    res.send('logged out');
}