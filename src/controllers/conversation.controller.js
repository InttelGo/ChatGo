import Role from "../models/Role.model.js";
import Conversation from "../models/Conversation.model.js";
import Client from "../models/Client.model.js";
import Message from "../models/message.model.js";
import Redirection from "../models/Redirection.model.js";
import User from "../models/User.model.js";
import { getIO } from "../io.js";


export const newMessage = async (req, res) => {
  try {
    const { contacts, messages, changes } = req.body.entry[0].changes[0].value;
    if (changes) console.log(changes);
    console.log(req.body.entry[0].changes[0]);
    if (!contacts)
      return res.status(401).json(["No hay contactos en el mensaje"]);

    const clientNumber = contacts[0].wa_id;
    const clientName = contacts[0].profile.name;
    if (!messages[0].text.body)
      return res.status(401).json(["No hay contenido en el mensaje"]);

    const messageContent = messages[0].text.body;
    const messageType = messages[0].type;
    const idMessage = messages[0].id;

    let client = await Client.findOne({ number: clientNumber });

    if (!client) {
      client = new Client({
        number: clientNumber,
        name: clientName,
      });
      client = await client.save();
      if (!client) return res.status(401).json(["Error al crear el cliente"]);
    }

    const findRole = await Role.findOne({ descripcion: "General" });
    if (!findRole) return res.status(401).json(["Error al encontrar el role"]);

    let conversation = await Conversation.findOne({ client: client._id });
    let isNewConversation = false;

    if (!conversation) {
      isNewConversation = true;
      conversation = new Conversation({
        role: findRole._id,
        client: client._id,
        read: false,
        items: [],
      });
      conversation = await conversation.save();
      if (!conversation)
        return res.status(401).json(["Error al guardar la conversacion"]);
    }

    let message = await Message.findOne({ wmid: idMessage });

    if (message) {
      return res.status(200).json([client.name + " está viendo el chat"]);
    }

    message = new Message({
      wmid: idMessage,
      from: client._id,
      fromType: "clients",
      message: messageContent,
      type: messageType,
    });

    const savedMessage = await message.save();
    if (!savedMessage) {
      return res.status(401).json(["Error al guardar el mensaje"]);
    }

    await Conversation.findByIdAndUpdate(conversation._id, {
      $push: { items: { itemId: savedMessage._id, refType: "messages" } },
    });

    const populatedConversation = await Conversation.findById(
      conversation._id
    ).populate("items.itemId");

    if (!populatedConversation) {
      return res.status(401).json(["Error al poblar la conversación"]);
    }

    const lastMessage = populatedConversation.items
      .filter((item) => item.refType === "messages")
      .map((item) => item.itemId);

    const io = getIO();

    if (isNewConversation) {
      const formattedConversation = {
        _id: conversation._id,
        role: conversation.role,
        client: {
          number: client.number,
          name: client.name,
        },
        participants: conversation.participants,
        read: conversation.read,
        lastItem: lastMessage ? lastMessage : null,
      };
      io.emit("nueva_conversacion", formattedConversation);
      res.status(201).json(formattedConversation);
    } else {
      const newMessageData = {
        conversationId: conversation._id,
        newMessage: {
          typeMessage: "messages",
          from: savedMessage.from,
          message: savedMessage.message,
          type: savedMessage.type,
          createdAt: savedMessage.createdAt,
          wmid: savedMessage.wmid,
        },
      };
      io.emit("mensaje_nuevo", newMessageData);
      res.status(200).json(newMessageData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
};

export const getAllConversation = async (req, res) => {
  const { role, state } = req.body;
  try {
    let conversations = null;

    if (state == 2) {
      conversations = await Conversation.find({ role: role, read: false });
    } else if (state == 1) {
      conversations = await Conversation.find({ role: role, read: true });
    } else {
      conversations = await Conversation.find({ role: role });
    }

    if (!conversations || conversations.length === 0) {
      return res.status(201).json({ message: "No hay conversaciones" });
    }

    const populatedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        const client = await Client.findById(conversation.client);

        // Poblar todos los items (sin ordenar aún)
        const populatedConversation = await Conversation.findById(
          conversation._id
        ).populate("items.itemId");

        if (!populatedConversation) {
          return null;
        }

        // Ordenar los items de forma ascendente por fecha de creación
        const sortedItems = populatedConversation.items.sort(
          (a, b) => a.itemId.createdAt - b.itemId.createdAt
        );

        // Tomar el último elemento
        const lastItem = sortedItems.length > 0 ? sortedItems[sortedItems.length - 1] : null;

        let lastMessage = null;
        let lastRedirection = null;
        let fromUser = null;
        let toUser = null;

        if (lastItem) {
          if (lastItem.refType === "messages") {
            lastMessage = await Message.findById(lastItem.itemId);
          } else {
            lastRedirection = await Redirection.findById(lastItem.itemId);
            if (lastRedirection) {
              fromUser = await User.findById(lastRedirection.from);
              toUser = await User.findById(lastRedirection.to);
            }
          }
        }

        return {
          _id: conversation._id,
          role: conversation.role,
          client: {
            number: client.number,
            name: client.name,
          },
          participants: conversation.participants,
          read: conversation.read,
          lastMessage: lastMessage
            ? {
                typeMessage: "messages",
                from: lastMessage.from,
                message: lastMessage.message,
                type: lastMessage.type,
                fromType: lastMessage.fromType,
                createdAt: lastMessage.createdAt,
                updatedAt: lastMessage.updatedAt,
                wmid: lastMessage.wmid,
              }
            : lastRedirection
            ? {
                typeMessage: "redirections",
                from: fromUser ? fromUser.name : "Desconocido",
                to: toUser ? toUser.name : "Desconocido",
                reason: lastRedirection.reason,
                createdAt: lastRedirection.createdAt,
                updatedAt: lastRedirection.updatedAt,
              }
            : null,
        };
      })
    );
    res.status(201).json(populatedConversations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las conversaciones" });
    console.error(error);
  }
};

export const getConversation = async (req, res) => {
  const { number, description, foto, message } = req.body;
  try {
    // Encontrar el cliente por numero
    const client = await Client.findOne({ number: number });

    // Delegate logic based on whether the client exists
    const newMessage = await existingClient(client, message);
    if (!newMessage)
      return await newClient(number, description, foto, message, res);

    return res.json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el mensaje" });
    return null;
  }
};

export const updateConversation = async (req, res) => {
  console.log(req.body);
  const { conversation } = req.body;
  try {
    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversation._id,
      {
        read: conversation.read,
        participants: conversation.participants,
        updatedAt: new Date(),
      },
      { new: true }
    );
  } catch (error) {
    res.status(500).json(["Error al actualizar la conversacion"]);
  }
};
