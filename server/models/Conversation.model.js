const mongoose = require("mongoose");
const ClientSchema = require("./Client.model.js");
const UserSchema = require("./User.model");
const MessageSchema = require("./Message.model");
const RedirectionSchema = require("./Redirection.model");


const ConversationSchema = new mongoose.Schema({
    id_conversacion: { type: Number, required: true },
    tipo: {
      id: { type: Number, required: true },
      descripcion: { type: String, required: true },
    },
    cliente: ClientSchema,
    usuario: [UserSchema],
    mensajes: [MessageSchema],
    redirecciones: [RedirectionSchema],
});

module.exports = mongoose.model("Conversation", ConversationSchema);    