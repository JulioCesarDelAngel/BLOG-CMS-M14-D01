const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model{};

User.init(
    {
        id: {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        username : {
            type : DataTypes.STRING,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                len : [4]
            }
        }
    },
    {
        sequelize,              //Instancia de conexion.
        timestamps : false,     //No agrega atributos updt y created at
        freezeTableName : true, //no cambia  o pluraliza el nombre de la tabla
        underscored : false,    //no agrega guion bajo snake_case/camelCase
        modelName : 'user'      //nombre del modelo con
    }
);

module.exports = User;