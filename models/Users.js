const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../connection/connection');

class Users extends Model {
    /*checkPassword(loginPass) {
        return bcrypt.compareSync(loginPass, this.password);
    }*/
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        location: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        skill: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
        /*hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10)
                return newUserData
            }
        },*/
        sequelize,
        modelName: 'Users'
        }
);

console.log(Users === sequelize.models.Users);

module.exports = Users;