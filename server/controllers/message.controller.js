import Conversation from "../models/Conversation.model.js";
import ClientMessage from "../models/ClientMessage.model.js";
import Redirection from "../models/Redirection.model.js";
import UserMessage from "../models/UserMessage.js";
import User from "../models/User.model.js";
import { getIO } from "../io.js";

export const getMessages = async (req, res) => {
  const { chat } = req.body;
  try {
    console.log(chat);
    let conversationFound = await Conversation.findById(chat).populate(
      "items.itemId"
    );

    if (!conversationFound) {
      return res.status(404).json({ message: "Conversación no encontrada" });
    }

    // Mapeamos todos los items sin importar el tipo (mensajes o redireccionamientos)
    const items = await Promise.all(
      conversationFound.items.map(async (item) => {
        if (item.refType === "clientmessages") {
          const message = await ClientMessage.findById(item.itemId);
          console.log(message);
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
          console.log(redirection);

          return {
            _id: redirection._id,
            type: "redirection",
            createdAt: redirection.createdAt,
            updatedAt: redirection.updatedAt,
            from: redirection.from.name,
            to: redirection.to.name,
            reason: redirection.reason,
          };
        } else {
          const userMessage = await UserMessage.findById(item.itemId);
          console.log(userMessage);
          return {
            type: "usermessage",
            from: userMessage.from,
            fromType: userMessage.fromType,
            message: userMessage.message,
            createdAt: userMessage.createdAt,
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

export const newMessage = async (req, res) => {
  const { chat, message } = req.body;
  try {
    const conversation = await Conversation.findById(chat._id);
    if (!conversation)
      return res.status(404).json({ message: "Conversación no encontrada" });
    const newMessage = new UserMessage({
      from: req.user.id,
      fromType: "users",
      message,
      type: "text",
    });

    const saveMessage = await newMessage.save();

    if (!saveMessage)
      return res
        .status(400)
        .json({ message: "Error al guardar el mensaje en la conversación" });

    conversation.items.push({ itemId: saveMessage._id, refType: "usermessages" });
    await conversation.save();
    const io = getIO();
    const foundUser = await User.findById(req.user.id);
    io.emit("mensaje_nuevo", {
      conversationId: conversation.id,
      newMessage: {
        typeMessage: "usermessage",
        from: foundUser.name,
        fromType: saveMessage.fromType,
        message: saveMessage.message,
        createdAt: saveMessage.createdAt,
      }
    });
    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
};
