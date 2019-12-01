'use strict';

const router = require('express').Router();

var eventoController = require('./evento.controller.js')

// const API = '/api/evento/';
const API = '/';
    
router.get(API, (req, res) => {
    eventoController.query(req, res);
})

router.get(API + ':_id', (req, res) => {
    eventoController.getById(req, res);
})

router.post(API, (req, res) => {
    eventoController.add(req, res);
})

router.put(API + ':_id', (req, res) => {
    eventoController.update(req, res);
})

router.delete(API + ':_id', (req, res) => {
    eventoController.remove(req, res);
})

module.exports = router;

