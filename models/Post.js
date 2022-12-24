const { Mode, DataTypes} = require ('sequelize');
const sequelize = require('../config/connection');

class Post extends Model{};

Post.init(
    {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true            
        },
        title : {
            type: DataTypes.STRING,
            allowNull : false
        },
        content : {
            type : DataTypes.STRING,
            allowNull : false
        },
        createdat : {
            type : DataTypes.DATETIME,
            allowNull : false,
            defaultValue : sequelize.literal ("CURRENT_TIMESTAMP")
            
        },
        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : 'user',
                key : 'id'
            }
        }
    },
    {
        sequelize,              
        timestamps : false,     
        freezeTableName : true, 
        underscored : false,    
        modelName : 'post',     
        freezeTableName : true
    }    
)

module.exports = Post;