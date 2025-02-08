import Conversation from "../models/Conversation.model.js";
import Client from "../models/Client.model.js";
import Message from "../models/message.model.js";
import Redirection from "../models/Redirection.model.js";
import User from "../models/User.model.js"; // Importamos el modelo de usuario para poblar los nombres

export const getMessages = async (req, res) => {
  const { chat } = req.body;
  try {
    console.log(chat);
    let conversationFound = await Conversation.findById(chat).populate(
      "items.itemId"
    );

    console.log(conversationFound)

    if (!conversationFound) {
      return res.status(404).json({ message: "Conversación no encontrada" });
    }


    // Mapeamos todos los items sin importar el tipo (mensajes o redireccionamientos)
    const items = await Promise.all(
      conversationFound.items.map(async (item) => {
        if (item.refType === "messages") {
          const message = await Message.findById(item.itemId)
          return {
            type: "message",
            from: message.from,
            fromType: message.fromType,
            message: message.message,
            createdAt: message.createdAt,
          };
        } else if (item.refType === "redirections") {
          const redirection = await Redirection.findById(item.itemId)
            .populate("from", "name")
            .populate("to", "name");

          return {
            _id: redirection._id,
            type: "redirection",
            createdAt: redirection.createdAt,
            updatedAt: redirection.updatedAt,
            from: redirection.from.name,
            to: redirection.to.name,
            reason: redirection.reason,
          };
        }
      })
    );

    // Ordenar por fecha de creación (ascendente)
    items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los items de la conversación" });
  }
};
