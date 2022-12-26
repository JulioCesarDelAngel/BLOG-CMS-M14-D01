const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model{
    checkPassword(loginPwd) {
        return bcrypt.compareSync(loginPwd, this.password);
    };
};

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
            allowNull : false,
            unique:true
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
        hooks:{
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            }

        },
        sequelize,              //Instancia de conexion.
        timestamps : false,     //No agrega atributos updt y created at
        freezeTableName : true, //no cambia  o pluraliza el nombre de la tabla
        underscored : false,    //no agrega guion bajo snake_case/camelCase
        modelName : 'user'      //nombre del modelo con el que se identificara
    }
);

module.exports = User;