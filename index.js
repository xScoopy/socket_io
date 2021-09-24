const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.broadcast.emit('welcome user');
    socket.on('chat message', (msg, nickname) => {
        io.emit('chat message', msg, nickname);
    })
    socket.on('user typing', (nickname) => {
        io.emit('user typing', nickname)
    })
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});