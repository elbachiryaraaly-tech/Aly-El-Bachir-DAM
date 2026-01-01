const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// Almacén temporal de usuarios conectados y sus últimas posiciones
let users = {};

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado:', socket.id);

    // Cuando un dispositivo envía su ubicación
    socket.on('sendLocation', (data) => {
        // Guardamos o actualizamos la info del usuario
        users[socket.id] = data;
        
        // Retransmitimos la ubicación a TODOS los demás conectados, excepto al remitente
        socket.broadcast.emit('receiveLocation', {
            id: socket.id,
            ...data
        });
    });

    // Cuando un usuario se desconecta
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
        delete users[socket.id];
        // Avisar a los demás para quitar el marcador
        io.emit('userDisconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
