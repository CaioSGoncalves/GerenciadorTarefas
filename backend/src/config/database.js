const Sequelize = require('sequelize');

const dataBase = new Sequelize('sistematarefas', 'root', '123456', {
    // host: 'mysqlsrv',
    host: 'localhost',
    dialect: 'mysql',
    // port: '3306'
});

module.exports = dataBase;