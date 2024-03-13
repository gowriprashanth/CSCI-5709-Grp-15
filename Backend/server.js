const http = require('http');
require('dotenv').config()
const app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT || 3001;

server.listen(port);

server.on('error', (error) => {
    console.log('error while starting server' + error)
});

server.on('listening', () => {
    console.log('server started on port '+ port)
});