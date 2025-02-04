import Role from "../models/Role.model.js";
import Conversation from "../models/Conversation.model.js";
import Client from "../models/Client.model.js";
import Message from "../models/message.model.js";

export const newMessage = async (req, res) => {
  const { contacts, messages, changes } = req.body.entry[0].changes[0].value; //Mensajes y el usuario traido a traves del webhook
  if(changes)
    console.log(changes)
  console.log(req.body.entry[0].changes[0])
  if(!contacts)
    return res.status(401).json(["No hay contactos en el mensaje"]);

  const clientNumber = contacts[0].wa_id; //Numero telefonico del usuario
  const clientName = contacts[0].profile.name; //Nombre del usuario
  if(! messages[0].text.body)
    return res.status(401).json(["No hay contenido en el mensaje"]);

  // Check if the message is a new one
  const messageContent = messages[0].text.body; //contenido del mensage
  const messageType = messages[0].type; //tipo de mensage
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

    if (!conversation) {
      conversation = new Conversation({
        role: findRole._id,
        client: client._id,
        read: false,
      });

      conversation = await conversation.save();
      if (!conversation)
        return res.status(401).json(["Error al guardar la conversacion"]);
    }

    // Check if a message with this waMessageId already exists
    let message = await Message.findOne({ wmid: idMessage });

    if (message) {
      return res.status(200).json([client.name + " está viendo el chat"]); // Correct status code
    }

    message = new Message({
      wmid: idMessage,
      from: client._id,
      fromType: "clients",
      message: messageContent,
      type: messageType,
    });

    const savedMessage = await message.save(); // Save the message

    if (!savedMessage) {
      return res.status(401).json(["Error al guardar el mensaje"]);
    }

    // Update the Conversation's messages array (correctly)
    await Conversation.findByIdAndUpdate(conversation._id, {
      $push: { messages: savedMessage._id },
    });

    res.status(201).json(["Conversacion creada con exito..."]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
};

export const getAllConversation = async (req, res) => {
  const { role, state } = req.body;
  try {
    let conversations = null;
    let state2 = false;

    state2 = state == 1 ? true : false;

    conversations = await Conversation.find({
      role: role,
      read: state2,
    });

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
        read : conversation.read,
        participants : conversation.participants,
        updatedAt : new Date()
      },
      { new: true }
    );

    console.log(updatedConversation);
  } catch (error) {
    res.status(500).json(["Error al actualizar la conversacion"]);
  }
};
