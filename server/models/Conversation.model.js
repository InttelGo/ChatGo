import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    participants: [
      {
        _id: false, // Evita que se genere un _id automático en cada objeto del array
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        lastActive: Date, // Fecha de la última actividad del usuario en la conversación
      },
    ],
    items: [
      {
        _id: false, // Evita que se genere un _id automático en cada objeto del array
        itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
        refType: {
          type: String,
          enum: ["clientmessages", "usermessages", "redirections"],
          required: true,
        },
      },
    ],
    read: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  {
    timestamps: true, // Condiciones generadas por mongoose
  }
);

export default mongoose.model("Conversation", ConversationSchema);
