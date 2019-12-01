'use strict';

const reviewService = require('./review.service.js');

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}

function query(req, res) {
    reviewService.query(req.query)
        .then(reviews => {
            res.json(reviews)})
        .catch(err => res.status(500).send(err));
}

function getById(req, res) {
    var _id = req.params._id;
    reviewService.get(_id)
        .then(review => res.json(review))
        .catch(err => res.status(500).send(err));
}

function add(req, res) {
    var review = req.body;
    var user = req.session.loggedUser;
    review.reviewerId = (user)? user._id : 'guest';
    reviewService.save(review)
        .then(review => res.json(review))
        .catch(err => res.status(500).send(err));
}

function update(req, res) {
    var review = req.body;
    reviewService.save(review)
        .then(review => res.json(review))
        .catch(err => res.status(500).send(err));
}

function remove(req, res) {
    var _id = req.params._id;
    reviewService.remove(_id)
        .then(review => res.json(review))
        .catch(err => res.status(500).send(err));
}