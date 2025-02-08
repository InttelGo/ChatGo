import Role from "../models/Role.model.js";
import Conversation from "../models/Conversation.model.js";
import User from "../models/User.model.js";
import Redirection from "../models/Redirection.model.js";
import { getIO } from "../io.js";

export const redirectTo = async (req, res) => {
  const { redirections, conversation } = req.body;
  try {
    const foundConversation = await Conversation.findById(conversation._id);
    if (!foundConversation)
      return res.status(404).json({ message: "Conversación no encontrada" });

    const foundUserTo = await User.findById(redirections.to);
    if (!foundUserTo)
      return res.status(404).json({ message: "Usuario destino no encontrado" });

    if(foundUserTo._id == req.user.id) 
        return res.status(400).json({ message: "No puede redireccionar a su mismo usuario" });

    let foundRole = await Role.findById(foundUserTo.role);

    if (!foundRole)
      return res.status(404).json({ message: "Role no encontrada" });

    if(foundRole.descripcion == "Super usuario"){
      foundRole = await Role.findOne({descripcion: "General"});
    }

    const newRedirection = new Redirection({
      conversation: foundConversation._id,
      to: foundUserTo._id,
      from: req.user.id,
      reason: redirections.reason,
    });

    const savedRedirection = await newRedirection.save();

    foundConversation.items.push({
      itemId: savedRedirection._id,
      refType: "redirections",
    });

    foundConversation.participants.push({
      user: req.user.id,
      lastActive: new Date(),
    });
    
    foundConversation.assignedTo = foundUserTo._id;
    foundConversation.role = foundRole._id;
    foundConversation.updatedAt = new Date();
    
    const savefoundConversation = await foundConversation.save();

    const io = getIO();
    io.emit("redirected", {redirect: savedRedirection, chat: conversation});
    
    res.status(201).json({message: "Conversación redireccionada con éxito"});
  } catch (error) {
    res.status(500).json({ message: "Error inesperado " + error.message });
  }
};
