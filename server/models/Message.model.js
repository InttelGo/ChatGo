const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  autor: { type: String, required: true }, // Puede ser un número o un ID de usuario
  contenido: { type: String, required: true },
  tipo: { type: String, enum: ['texto', 'audio', 'imagen'], required: true },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.model("message", MessageSchema);