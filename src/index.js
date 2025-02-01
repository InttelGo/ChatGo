import app from './app.js';
import https from 'https';
import fs from 'fs';
import { connectDB } from './db.js';

const httpsOptions = {
    key: fs.readFileSync("/var/www/chatgo/src/private.key"),  // Clave privada
    cert: fs.readFileSync("/var/www/chatgo/src/certificado.crt"), // Certificado principal
    ca: fs.readFileSync("/var/www/chatgo/src/certificado-ca.crt"), // Certificado CA si es necesario
  };

// Conectar a la base de datos
connectDB();

// Inicializar servidor HTTPS
const PORT = 8443;
https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Servidor HTTPS corriendo en el puerto ${PORT}`);
});