import Conversation from "../models/Conversation.model.js";
import Client from "../models/Client.model.js";
import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
    const { chat } = req.body;
    try {
        let conversationFound = await Conversation.findById(chat._id).populate("messages"); // Poblar los mensajes

        if (!conversationFound) {
            return res.status(404).json({ message: "Conversación no encontrada" });
        }

        // Extraer solo la información relevante de los mensajes
        const messages = conversationFound.messages.map(msg => ({
            _id: msg._id,
            from: msg.from,
            fromType: msg.fromType,
            message: msg.message,
            type: msg.type,
            createdAt: msg.createdAt
        }));

        console.log(messages);
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al entregar los mensajes" });
    }
};
