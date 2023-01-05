require('dotenv').config();
const path = require('path');
const express = require('express');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

//test relaciones 
//const { User, Post, Comment} = require ('./models');

const app = express();
const PORT = process.env.PORT || 3001; //Necesario para el despliegue en Heroku 

// Set up sessions with cookies
const sess = {
    secret: 'Super secret secret',
     cookie: {
      // Stored in milliseconds (86400 === 1 day)
      maxAge: 86400,
      secure: false,
    },  
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

app.use(session(sess));
const hbs = exphbs.create({helpers});

//Settings : por defecto la carpeta views debe estar al inicio del proyecto, se puede Re configurar 
app.set('views', path.join(__dirname, 'views'));
console.log('Ruta de las vistas:' , app.get('views') );
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended : true}));


//Archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

//ruta de pruebas
/* app.get('/', (request, response) => {
    //response.send('On Line Dev and db');
    response.render('index');
}); */
//rutas de Controllers
app.use(require('./controllers'));


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