import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';


const app = express();
const server = http.createServer(app);
const webSocket = new Server(server);   

app.get('/', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

webSocket.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages from clients
    socket.on('chat message', (msg) => {
        webSocket.emit('chat message', msg); // Broadcast message to all connected clients
    });

    // Listen for disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});