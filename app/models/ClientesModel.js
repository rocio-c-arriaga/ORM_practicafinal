const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Clientes = sequelize.define('clientes', {
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
        telefono:{
            type: Sequelize.INTEGER,
            primaryKey: false
        },
        area:{
            type: Sequelize.STRING,
            primaryKey: false
        },
    }, {timestamps: false});

    return Clientes;
}

