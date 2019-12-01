'use strict';

const router = require('express').Router();

var reviewController = require('./review.controller.js')

// const API = '/api/review/';
const API = '/';
    
router.get(API, (req, res) => {
    reviewController.query(req, res);
})

router.get(API + ':_id', (req, res) => {
    reviewController.getById(req, res);
})

router.post(API, (req, res) => {
    reviewController.add(req, res);
})

router.put(API + ':_id', (req, res) => {
    reviewController.update(req, res);
})

router.delete(API + ':_id', (req, res) => {
    reviewController.remove(req, res);
})

module.exports = router;

