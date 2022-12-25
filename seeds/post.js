const { Post } = require( '../models');

const postRows = [
    {
        title : 'Hash en contraseñas al usar bulkcreate',
        content : 'Crear el hook en tu modelo, y hablilitar la opción { individualHooks : true}.',
        user_id : 1
    },
    {
        title : 'Uso timeStamp y sequelize.literal en la implementacion createdAt',
        content : 'Habilitar el default value en tu modelo, defaultValue : sequelize.literal ("CURRENT_TIMESTAMP")',
        user_id : 2
    }

];

const seedPost = () => Post.bulkCreate(postRows);
module.exports = seedPost;