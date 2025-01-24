import app from './app.js';
import https from 'https';
import fs from 'fs';
import { connectDB } from './db.js';

// Cargar certificado SSL
const sslOptions = {
    cert: fs.readFileSync('/var/www/chatgo/src/certificado.crt'), // Asegúrate de usar rutas absolutas correctas
    key: fs.readFileSync('/var/www/chatgo/src/private.key') // Clave privada del certificado
};

// Conectar a la base de datos
connectDB();

// Inicializar servidor HTTPS
const PORT = 8443;
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Servidor HTTPS corriendo en el puerto ${PORT}`);
});