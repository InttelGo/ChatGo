import app from './app.js';
import https from 'https';
import fs from 'fs';
import { connectDB } from './db.js';
import { Server as SocketIOServer } from 'socket.io';

const httpsOptions = {
    key: fs.readFileSync("/var/www/chatgo/src/private.key"),
    cert: fs.readFileSync("/var/www/chatgo/src/certificado.crt"),
    ca: fs.readFileSync("/var/www/chatgo/src/certificado-ca.crt"),
};

// Conectar a la base de datos
connectDB();

// Inicializar servidor HTTPS
const PORT = 8443;
const server = https.createServer(httpsOptions, app);

// Integrar Socket.io
const io = new SocketIOServer(server, {
    cors: {
        origin: "*",  // En este caso puede recibir peticiones desde cualquier sitio
        methods: ["GET", "POST", "PUT"]
    }
});

// Evento de conexión de socket
io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    socket.on("mensaje", (data) => {
        console.log("Mensaje recibido:", data);
        io.emit("mensaje", data);  // Reenviar a todos los clientes
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor HTTPS con Socket.io corriendo en el puerto ${PORT}`);
});
