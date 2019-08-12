const Sequelize = require('sequelize');

const sequelize = new Sequelize('sistematarefas', 'root', '123456', {
    host: "localhost",
    dialect: 'mysql'
});

const Task = sequelize.define('tarefas', {
    titulo:{
        type: Sequelize.STRING
    },
    completada:{
        type: Sequelize.BOOLEAN
    }
});

Task.sync();

module.exports = Task;
