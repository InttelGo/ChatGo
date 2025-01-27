import Role from "../models/Role.model.js";

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

}

export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        if(!roles)
            return res.status(404).json({ message: "No hay roles" });
    
        res.status(201).json(roles);
        
    } catch (error) {
        res.status(500).json({ message: "Error inesperado" });
    }
}