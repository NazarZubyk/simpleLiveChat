import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import MessageStorage from './msgStorage';

const app = express();
const server = http.createServer(app);
const webSocket = new Server(server);   

const msgStorage = new MessageStorage();

// Send index.html on the root route
app.get('/', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Listen for a new connection on the WebSocket
webSocket.on('connection', (socket) => {

    // Log when a user connects
    console.log('\x1b[32mA user connected\x1b[0m');
    console.log('User ID:', socket.id);

    // Add the socket to the 'users' room
    socket.join('users');

    // Send chat history if messages exist in storage
    if (msgStorage.get().length > 0) {
        socket.emit('chat history', msgStorage.get());
    }

    // Listen for 'add message' event from client
    socket.on('add message', (msg) => {
        msgStorage.push(msg); // Add message to storage
        console.log(msg); // Log the message
        webSocket.to('users').emit('chat history', msgStorage.get()); // Emit updated chat history
    });

    // Listen for the 'disconnect' event
    socket.on('disconnect', () => {
        console.log('\x1b[33mUser disconnected\x1b[0m'); // Log the disconnection
        console.log('User ID:', socket.id); // Log the user ID
    });

});

// Start the server and listen on port 3000
server.listen(3000, () => {
    console.log('listening on *:3000');
});
