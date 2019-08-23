const Sequelize = require('sequelize');

const dataBase = new Sequelize('sistematarefas', 'root', '123456', {
    host: "localhost",
    dialect: 'mysql'
});

module.exports = dataBase;