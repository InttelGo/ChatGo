import Role from "../models/Role.model.js";
import Conversation from "../models/Conversation.model.js";
import Client from "../models/Client.model.js";
import Message from "../models/Message.model.js";

export const sendMessage = async (req, res) => {
    const { conversationId, message } = req.body;
  
    // Validate request body
    if (!message) return res.status(400).json({ message: 'Es reuqerido un mensage para enviarlo' });
  
    try {
    console.log("Searching for conversation with ID:", conversationId);
      // Find the conversation by its _id
      const foundConversation = await Conversation.findById(conversationId);

      console.log(foundConversation);
      if (!foundConversation) return res.status(404).json({ message: 'No se ha encontrado la conversacion' });
  
      // Crear el mensaje
      const newMessage = new Message({
        conversationId: foundConversation._id,
        sender: req.user.id, //Asignarle el id del usuario que previamente se comprovo
        senderType: "User", // Asumiendo que el vendedor escribio
        content: message,
      });
  
      const savedMessage = await newMessage.save();
  
  
      res.status(201).json("Mensaje guardado correctamente");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al enviar el mensaje' });
    }
  };

export const getConversation = async (req, res) => {
  const { number, description, foto, message } = req.body;
  try {
    // Find the client by their number
    const client = await Client.findOne({ number: number });
  
    // Delegate logic based on whether the client exists
    const newMessage = await existingClient(client, message);
    if (!newMessage) return await newClient(number, description, foto, message, res);
    
  
    return res.json(newMessage); // Assuming you want to return the conversation
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el mensaje' });
    return null;
  }
};

async function existingClient(client, message) {
  // funcion para cuando existe el cliente
  if (!client) return null;

  const conversation = await Conversation.findOne({ client: client._id }); //consulto si tienen alguna conversacion con el
  if (!conversation) return null;

  const newMessage = new Message({
    //Agrego un mensaje a la conversacion
    conversationId: conversation._id,
    sender: client._id,
    senderType: "Client",
    content: message,
  });

  const savedMessage = await newMessage.save();

  conversation.read = false;
  await conversation.save();

  return savedMessage;
}

//Llegada de un nuevo cliente
async function newClient(clientNumber, description, foto, message, res) {
  const newClient = new Client({
    number: clientNumber,
    description,
    foto,
  });

  const savedClient = await newClient.save();

  const foundRole = await Role.findOne({ description: "General" });
  if (!foundRole) return res.status(404).json({ message: "Rol no encontrado" });


  const newConversation = new Conversation({
    area: foundRole._id,
    client: savedClient._id,
    read: false,
  });

  const savedConversation = await newConversation.save();

  const newMessage = new Message({
    conversationId: savedConversation._id,
    sender: savedClient._id,
    senderType: "Client",
    content: message,
  });

  const savedMessage = await newMessage.save();

  return savedMessage;
};
