import Role from "../models/Role.model.js";
import Conversation from "../models/Conversation.model.js";

export const createRole = async (req, res) => {
  const { descripcion } = req.body;
  try {
    const newRole = new Role({
      descripcion,
    });

    const rolSave = await newRole.save();
    res.status(201).json(rolSave);
  } catch (error) {
    res.status(500).json({ message: "Error inesperado" });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const userRole = await Role.findById(req.user.role);

    if (!userRole) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    let roles = [];
    let allowedRoles = [];
    let status = [];

    switch (userRole.descripcion) {
      case "Super usuario":
        allowedRoles = await Role.find({ id: { $ne: 1 } });
        break;
      case "Administrador":
        allowedRoles = await Role.find({ id: { $in: [2, 3] } });
        break;
      default:
        allowedRoles = await Role.find({ id: { $in: [2, 4] } });
    }

    if (!allowedRoles.length) {
      return res.status(404).json(["No hay roles disponibles"]);
    }

    for (const role of allowedRoles) {
      const chatCount = await Conversation.countDocuments({ role: role._id });
      roles.push({
        role: { _id: role._id, id: role.id, descripcion: role.descripcion },
        cantidad: chatCount,
      });
    }

    status.push({estado: "leidos", cantidad: await Conversation.countDocuments({read: true}), number: 1});
    status.push({estado: "No leidos", cantidad: await Conversation.countDocuments({read: false}), number: 2});
    console.log({areas: roles, status: status});
    res.status(200).json({areas: roles, status: status});
  } catch (error) {
    console.error("Error en getAllRoles:", error);
    res.status(500).json({ message: "Error inesperado" });
  }
};

export const getNumConverations = async (req, res) => {
  try {
    const numConversaciones = await Conversation.countDocuments();
    res.status(200).json({ numConversaciones });
  } catch (error) {
    res.status(500).json({ message: "Error inesperado" });
  }
};
