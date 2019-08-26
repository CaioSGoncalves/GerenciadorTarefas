const Sequelize = require("sequelize");
const db = require("../config/database");

const Task = db.define("tasks", {
  titulo: {
    type: Sequelize.STRING
  },
  completada: {
    type: Sequelize.BOOLEAN
  },
  image_url: {
    type: Sequelize.STRING
  }
});

Task.sync();

module.exports = Task;
