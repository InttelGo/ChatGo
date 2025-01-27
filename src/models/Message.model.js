import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderType", //Esta es la posible llave que puede tener a la hora de crear el mensaje
      required: true,
    },
    senderType: {
      type: String,
      enum: ["User", "Client"], // Define los podibles tipos de mensajeros
      required: true,
    },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("mesagge", MessageSchema);