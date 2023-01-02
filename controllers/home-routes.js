const router = require('express').Router();
const {Post , User, Comment } = require('../models');

router.get('/', async (request, response) => {
    postData = await Post.findAll({
        attributes:[
            'id',
            'title',
            'content',
            'createdat',
            'user_id'
        ],
        include : [
            {
                model: User,
                attributes : ['username']
            },
        ]
    }); 

     commentData = await Comment.findAll({
        attributes:['id', 'post_id', 'comment', 'createdat'], 
        include : [ { model: User, attributes : ['username']}]
    })

    const postRows = postData.map(rows => rows.get({ plain: true }));
    console.log('Map Post: ', postRows);   
    const commentRows = commentData.map(rows => rows.get({ plain: true }));
    console.log('Map Comment: ', commentRows);   

    response.render('index', {postRows, commentRows});
})



module.exports = router;