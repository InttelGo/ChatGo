import User from "../models/User.model.js";
import Role from "../models/Role.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, username, password, idRole } = req.body;

  try {
    const foundRole = await Role.findOne({ id: idRole });

    if (!foundRole)
      return res.status(400).json({ message: "Rol no encontrado" });
    //Creacion de contraseña encriptada
    const passwordHash = await bcrypt.hash(password, 10);

    //Creacion del usuario como modelo
    const newUser = new User({
      name,
      username,
      role: foundRole,
      password: passwordHash,
    });

    //Guarda el usuario en la base de datos
    const userSave = await newUser.save();

    console.log(userSave);
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error inesperado" });
  }
};

export const updatedAttributes = async (req, res) => {
  const { name, username, roleId, password } = req.body;
  try {
    if (!name || !username || !password)
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });

    let role = "";
    if (!roleId) {
      role = req.user.id;
    } else {
      role = roleId;
    }
    //Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: name, username: username, role: role, password: passwordHash },
      { new: true }
    );

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {}
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error inesperado" });
  }
};

export const desactiveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    user.state = false;

    const updatedUser = await user.save();
    if (!updatedUser)
      return res
        .status(400)
        .json({ message: "Error al desactivar el usuario" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error inesperado" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const usersByRole = await User.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "roleInfo",
        },
      },
      {
        $unwind: "$roleInfo", 
      },
      {
        $group: {
          _id: {
            roleId: "$roleInfo._id",
            descripcion: "$roleInfo.descripcion", 
          },
          users: {
            $push: {
              _id: "$_id",
              name: "$name",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          role: "$_id.roleId",
          descripcion: "$_id.descripcion",
          users: 1,
        },
      },
    ]);
    console.log(usersByRole);
    res.json(usersByRole);
  } catch (error) {
    console.error("Error getting users by role:", error);
    res.status(500).json({ message: "Error getting users by role" });
  }
};
