const routes = require('express').Router();
const multer = require('multer');

const TaskController = require('./controllers/TaskController');
const multerConfig = require('./config/multer');


routes.get('/tarefas', TaskController.index);
routes.post('/tarefas', TaskController.store);

routes.post('/tarefas/:id/completar',  multer(multerConfig).single('file'), TaskController.update);


module.exports = routes;
