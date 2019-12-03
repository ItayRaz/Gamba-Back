'use strict';

module.exports = {
    userValidation,
    adminValidation
}

function userValidation(req, res, next) {
    var user = req.session.loggedUser;
    if (!user) res.status(404).send('not logged in');
    else next();
}

function adminValidation(req, res, next) {
    var user = req.session.loggedUser;
    if (!user || !user.isAdmin) res.status(404).send('not an admin');
    else next();
}