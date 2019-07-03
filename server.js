var bodyParser = require ('body-parser')
var Sequelize = require('sequelize')

var userModel = require('./app/models/UserModel');
var tokenController = require('./app/controller/JWTController');
var clientesController = require('./app/controller/clientesController');
var clientModel = require('./app/models/ClientesModel');

var express = require('express'),
app = express (),
port = process.env.PORT || 3000

app.use(bodyParser.json())

const sequelize = new Sequelize ('ORM_practicafinal', 'root', '5678', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    tokenController(app,userModel(sequelize))
    clientesController(app,clientModel(sequelize))

app.listen(port)

console.log('app is running')