require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001; //Necesario para el despliegue en Heroku 

//Settings : por defecto la carpeta views debe estar al inicio del proyecto, se puede Re configurar 
app.set('views', path.join(__dirname, 'views'));
console.log('Ruta de las vistas:' , app.get('views') );

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

//ruta de pruebas
app.get('/', (request, response) => {
    response.send('On Line DevEd');
});

//Archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => console.log( ` Now listening on port ${PORT} `));