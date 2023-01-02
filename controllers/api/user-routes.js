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
            response
              .status(200)
              .json({ message: 'Welcome!' });
            return;
        
        }
    }    
    catch ( error ) {
        console.log(error);
        response.status(500).json(error);
    }
})


router.get('/singup', async (request, response) => {
    /*     if (request.session.loggedIn != null) {
            response.redirect('/');
        } */        
        response.render('login', {typeLogin:false});
        //response.render('partials/navigation');
    
        //response.send('get Login ok')
    })

module.exports = router;