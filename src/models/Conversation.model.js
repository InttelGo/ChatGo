import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    participants: [
      {
        //Listado de los participantes o atendedores de la conversacion
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        lastActive: Date, // Fecha de la última actividad del usuario en la conversación
      },
    ],
    redirections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Redirection",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
      },
    ],
    read: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  {
    //Condiciones generadas por mongoose
    timestamps: true,
  }
);
export default mongoose.model("Conversation", ConversationSchema);
