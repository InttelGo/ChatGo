import Role from "../models/Role.model.js";
import Conversation from "../models/Conversation.model.js";
import Client from "../models/Client.model.js";
import Message from "../models/message.model.js";
import { getIO } from "../io.js";

export const newMessage = async (req, res) => {
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

  try {
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
      $push: { messages: savedMessage._id },
    });

    const populatedConversation = await Conversation.findById(conversation._id).populate({
      path: "messages",
      options: { sort: { createdAt: -1 }, limit: 1 },
    });

    const lastMessage =
      populatedConversation.messages.length > 0
        ? populatedConversation.messages[0]
        : null;

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
        lastMessage: lastMessage
          ? {
              from: lastMessage.from,
              message: lastMessage.message,
              type: lastMessage.type,
              createdAt: lastMessage.createdAt,
              updatedAt: lastMessage.updatedAt,
              wmid: lastMessage.wmid,
            }
          : null,
      };
      io.emit("nueva_conversacion", formattedConversation);
      res.status(201).json(formattedConversation);
    } else {
      const newMessageData = {
        conversationId: conversation._id,
        newMessage: {
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

    if(state == 2){
      conversations = await Conversation.find({
        role: role,
        read: false,
      });
    }else if(state == 1){
      conversations = await Conversation.find({
        role: role,
        read: true,
      });
    }else{
      conversations = await Conversation.find({
        role: role,
      });
    }

    

    if (!conversations || conversations.length === 0) {
      return res.status(201).json({ message: "No hay conversaciones" });
    }

    const populatedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        console.log(conversation);
        const client = await Client.findById(conversation.client);
        const populatedConversation = await Conversation.findById(
          conversation._id
        ).populate({
          path: "messages",
          options: { sort: { createdAt: -1 }, limit: 1 },
        });

        const lastMessage =
          populatedConversation.messages.length > 0
            ? populatedConversation.messages[0]
            : null;

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
                from: lastMessage.from,
                message: lastMessage.message,
                type: lastMessage.type,
                createdAt: lastMessage.createdAt,
                updatedAt: lastMessage.updatedAt,
                wmid: lastMessage.wmid,
              }
            : null,
        };
      })
    );

    res.status(201).json(populatedConversations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las conversaciones" });
    console.error(error);
    return null;
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

    console.log(updatedConversation);
  } catch (error) {
    res.status(500).json(["Error al actualizar la conversacion"]);
  }
};
