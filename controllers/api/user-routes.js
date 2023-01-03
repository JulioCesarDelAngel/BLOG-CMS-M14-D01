const router = require('express').Router();
const { User } = require('../../models');

router.get('/login', async (request, response) => {    
    response.render('login', {typeLogin:true});
})

router.post('/login', async (request, response) => {
    //response.send('post Login ok request:Usr/psw'+ `${request.body.inputUser}` +'/'+ `${request.body.inputPassword}`)
    try {
        const userDb = await User.findOne({
            where :{
                username : request.body.inputUser
            }
        });
        
        if (!userDb)
        {
            response
            .status(400)
            .json({message:'Usuario no encontrado!'});
            return;
        }

        const validPassword = await userDb.checkPassword(request.body.inputPassword);
        if (!validPassword) {
            response
              .status(400)
              .json({ message: 'password incorrecto. intente de nuevo!' });
            return;
          }
        else{
            request.session.save(() => {
                request.session.loggedIn = true;
                request.session.username = userDb.username;
                request.session.userid = userDb.id;
                console.log('almacenado variables de session', request.session.cookie);
                response.redirect('/');
            });
        }
    }    
    catch ( error ) {
        console.log(error);
        response.status(500).json(error);
    }
})


router.get('/singup', async (request, response) => {
        response.render('login', {typeLogin:false});
    })


router.get('/logout', async (request, response) => {
    //response.render('login', {typeLogin:false});
    if (request.session.loggedIn) {
        request.session.destroy(() => {
          //request.status(204).end();
          response.redirect('/');
        });
      } else {
        response.redirect('/');
        //res.status(404).end();
      }

})



module.exports = router;