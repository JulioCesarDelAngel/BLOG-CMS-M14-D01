require('dotenv').config();
const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

//test relaciones 
//const { User, Post, Comment} = require ('./models');

const app = express();
const PORT = process.env.PORT || 3001; //Necesario para el despliegue en Heroku 

//Settings : por defecto la carpeta views debe estar al inicio del proyecto, se puede Re configurar 
app.set('views', path.join(__dirname, 'views'));
console.log('Ruta de las vistas:' , app.get('views') );
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

//ruta de pruebas
app.get('/', (request, response) => {
    //response.send('On Line Dev and db');
    response.render('index');
});

//Archivos estaticos
app.use(express.static(path.join(__dirname,'public')));


sequelize.sync( {force : false} ).then( ()=> {

    app.listen(PORT, () => console.log( ` Now listening on port ${PORT} `));
    //testData();

});


/* async function  testData(){
    console.log('Usuarios y sus posts:')
    const userData = await User.findByPk(1, { include : [ { model : Post} ] });
    console.log('Usuarios y sus posts:' , userData );

    console.log('Usuarios y sus comments:')
    const userCommentData = await User.findByPk(1, { include : [ { model : Comment} ] });
    console.log('Usuarios y sus comments:' , userCommentData  );

    console.log('Post ,su owner y sus comentarios:')
    const PostUserData = await Post.findAll( { include : [ { model : User,
                                                include : [ { model : Comment} ]}
                                             ]});
    console.log('Post ,su owner y sus comentarios:' , PostUserData   );

    console.log('Post ,su owner y sus comentarios y su owner:')
    const PostUserDataComment = await Post.findAll( { include : [ { model : User,
                                                include : [ { model : Comment, include : [{ model : User}] } ]}
                                             ]});
    console.log('Post ,su owner y sus comentarios y su owner:' , PostUserDataComment    );

} */