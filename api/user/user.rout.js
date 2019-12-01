'use strict';

const router = require('express').Router();

const userController = require('./user.controller.js');

const API = '/';
    
router.get(API, (req, res) => {
    userController.query(req, res);
})

router.get(API + ':_id', (req, res) => {
    userController.getById(req, res);
})

router.post(API, (req, res) => {
    userController.signin(req, res);
})

router.post(API + 'login', (req, res) => {
    userController.login(req, res);
});

router.post(API + 'logout', (req, res) => {
    userController.logout(req, res);
})

router.put(API + ':_id', (req, res) => {
    userController.signin(req, res);
})

router.delete(API + ':_id', (req, res) => {
    userController.remove(req, res);
})

module.exports = router;