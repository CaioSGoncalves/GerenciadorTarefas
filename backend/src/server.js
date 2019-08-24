require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');


db = require('./config/database');
db.authenticate()
.then(() => console.log('Database Connected!'))
.catch(err => console.log('Error: ' + err));


const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);


io.on('connection', socket => {
    console.log('Nova conexão', socket.id);
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(
    '/files', 
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);
app.use(routes);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
server.listen(PORT, HOST, console.log(`Server started on port ${PORT}`));
