const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('usuarios', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            primaryKey: false
        },
        email:{
            type: Sequelize.STRING,
            primaryKey: false
        },
        rol:{
            type: Sequelize.INTEGER,
            primaryKey: false
        },
        ubicacion:{
            type: Sequelize.STRING,
            primaryKey: false
        },
        usuario:{
            type: Sequelize.STRING,
            primaryKey: false
        },
        contraseña:{
            type: Sequelize.STRING,
            primaryKey: false
        },
    }, {timestamps: false});

    return User;
}