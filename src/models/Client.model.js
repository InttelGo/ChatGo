import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true },
  numero: { type: String, required: true },
  foto: { type: String },
  descripcion: { type: String },
});

module.exports = mongoose.model("client", ClientSchema);