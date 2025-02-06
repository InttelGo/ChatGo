import app from "./app.js";
import https from "https";
import fs from "fs";
import { connectDB } from "./db.js";
import { initIO } from "./io.js";
import sockets from "./sockets.js";

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
const io = initIO(server);

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor HTTPS con Socket.io corriendo en el puerto ${PORT}`);
});

sockets(io);