"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const webSocket = new socket_io_1.Server(server);
app.get('/', (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path_1.default.join(__dirname, '../client/index.html'));
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
