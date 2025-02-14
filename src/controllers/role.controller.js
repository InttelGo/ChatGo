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
  console.log("req.user:", req.user); // Verifica si req.user existe

  try {
    const rolesFound = await Role.findById(req.user.role);
    console.log("Rol encontrado:", rolesFound);

    if (!rolesFound) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    let roles = {};
    let rolesFound2 = [];

    if (rolesFound.descripcion === "Super usuario") {
      rolesFound2 = await Role.find({ id: { $ne: 1 } });
    } else if (rolesFound.descripcion === "Administrador") {
      rolesFound2 = await Role.find({ id: { $in: [2, 3] } });
    } else {
      rolesFound2 = await Role.find({ id: { $in: [2, 4] } });
    }

    if (!roles.length) {
      return res.status(404).json(["No hay roles disponibles"]);
    }

    rolesFound2.forEach(async (role) => {
      const chatCount = await Conversation.countDocuments({ role: role._id });
      roles[role.descripcion] = chatCount;
    });

    console.log(rokes);

    res.status(200).json(roles);
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
