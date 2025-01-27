import Role from "../models/Role.model.js";
import Conversation from "../models/Conversation.model.js";
import User from "../models/User.model.js";
import Redirection from "../models/Redirection.model.js";

export const redirectTo = async (req, res) => {
  const { to, reason, conversationId } = req.body;
  try {
    const foundConversation = await Conversation.findById(conversationId);
    if (!foundConversation)
      return res.status(404).json({ message: "Conversación no encontrada" });

    const foundUserTo = await User.findById(to);
    if (!foundUserTo)
      return res.status(404).json({ message: "Usuario destino no encontrado" });

    if(foundUserTo._id == req.user.id) 
        return res.status(400).json({ message: "No puede redireccionar a su mismo usuario" });

    if (!reason)
      return res
        .status(404)
        .json({ message: "Debe llenar el campo del mensage" });

    const foundRole = await Role.findById(foundUserTo.role);

    if (!foundRole)
      return res.status(404).json({ message: "Role no encontrada" });

    console.log(foundRole);

    const newRedirection = new Redirection({
      conversation: foundConversation._id,
      to: foundUserTo._id,
      from: req.user.id,
      reason,
    });

    const savedRedirection = await newRedirection.save();

    foundConversation.redirections.push(savedRedirection._id);
    foundConversation.participants.push({
      user: req.user.id,
      lastActive: new Date(), // Fecha actual como último activo
    });
    foundConversation.assignedTo = foundUserTo._id;
    foundConversation.role = foundRole._id;
    const savefoundConversation = await foundConversation.save();

    console.log(savefoundConversation);
    res.status(201).json({message: "Conversacion redireccionada con exito"});
  } catch (error) {
    res.status(500).json({ message: "Error inesperado " + error.message });
  }
};
