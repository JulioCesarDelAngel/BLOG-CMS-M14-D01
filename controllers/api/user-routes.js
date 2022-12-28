const router = require('express').Router();
const { User } = require('../../models');

router.get('/login', async (request, response) => {
    response.send('get Login ok')
})

router.post('/login', async (request, response) => {
    response.send('post Login ok')
})

module.exports = router;