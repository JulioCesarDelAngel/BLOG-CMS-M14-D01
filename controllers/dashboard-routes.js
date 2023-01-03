const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post , User, Comment } = require('../models');
const appAuth = require('../utils/appAuth');

router.get('/', appAuth, (request, response) => {    
    response.send('post Login ok request:Usr/id'+ `${request.session.username}` +'/'+ `${request.session.userid}`)
});

module.exports = router;