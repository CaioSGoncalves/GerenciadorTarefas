const express = require('express');
const TaskController = require('./controllers/TaskController');

const routes = express.Router();

routes.get('/tarefas', TaskController.index);
routes.post('/tarefas', TaskController.store);
routes.put('/tarefas', TaskController.update);

module.exports = routes;
