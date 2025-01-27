import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    role: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Role", 
      required: true 
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    assignedTo: { //Usuario que actualmente esta atendiendo la conversacion
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    participants: [{ //Listado de los participantes o atendedores de la conversacion
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      lastActive: Date // Fecha de la última actividad del usuario en la conversación
    }],
    redirections: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Redirection'
    }],
    read: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
  },
  {
    //Condiciones generadas por mongoose
    timestamps: true,
  }
);
export default mongoose.model("Conversation", ConversationSchema);