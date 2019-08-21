// const axios = require('axios');
const Task = require('../models/Task');

module.exports = {
    async index(req, res) {
        const { todas } = req.headers;

        if (todas) {
            const tasks = await Task.findAll();
            return res.json(tasks);            
        }
        const tasks = await Task.findAll({
            where: {
                completada: false
             }
        });
        return res.json(tasks);
    },

    async store(req, res) {
        const { titulo } = req.body;
        const task = await Task.create({
            titulo,
            completada: false,
         });

        req.io.sockets.emit('update');
        return res.json(task);
    },

    async update(req, res) {
        const { id } = req.body;
        const task = await Task.findByPk(id);
        task.completada = true;
        await task.save();

        req.io.sockets.emit('update');
        return res.json(task);
    },

};