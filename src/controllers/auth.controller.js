import User from "../models/User.model.js";
import Role from "../models/Role.model.js";
import bcrypt from "bcryptjs";
import { createWebToken } from "../libs/jws.js";

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

    //Creacion del token de verificacion
    const token = await createWebToken({
      id: userSave._id,
      role: foundRole.id,
    });
    res.cookie("token", token);
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error inesperado" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username: username });

    if (!foundUser)
      return res.status(400).json({ message: "Credenciales Incorrectas" });
    //Creacion de la contraseña de la base de datos con la dijitada en el front
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch)
      return res.status(400).json({ message: "Credenciales Incorrectas" });

    const foundRole = await Role.findOne({ _id: foundUser.role });

    if (!foundRole)
      return res.status(400).json({ message: "Ha ocurrido un error " });
    const token = await createWebToken({
      id: foundUser._id,
      role: foundRole.id,
    });
    res.cookie("token", token);
    res.status(201).json({ message: "Usuario logeado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error inesperado" });
  }
};

export const logout = async (req, res) =>{
  res.cookie('token', "", {expires: new Date(0)});
  return res.status(200);
};
