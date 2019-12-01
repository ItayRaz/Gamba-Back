'use strict';

module.exports = {
    userValidation,
    adminValidation
}

function userValidation(req, res, next) {
    var user = req.session.logedUser;
    console.log('middleware user validation got session:', req.session);
    if (!user) res.status(404).send('not loged in');
    else next();
}

function adminValidation(req, res, next) {
    var user = req.session.logedUser;
    console.log('middleware admin validation got session:', req.session);
    if (!user || !user.isAdmin) res.status(404).send('not an admin');
    else next();
}