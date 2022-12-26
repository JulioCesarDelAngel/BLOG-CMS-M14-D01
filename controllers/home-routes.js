const router = require('express').Router();

router.get('/', async (request, response) => {
    response.render('index');
})

module.exports = router;