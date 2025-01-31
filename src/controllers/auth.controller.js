import User from "../models/User.model.js";
import Role from "../models/Role.model.js";
import bcrypt from "bcryptjs";
import { createWebToken } from "../libs/jws.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username: username });

    if (!foundUser)
      return res.status(400).json(["Credenciales Incorrectas"]);
    
    if(!foundUser.state)
      return res.status(401).json(["Usuario inactivo"]);

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    
    //Creacion de la contraseña de la base de datos con la dijitada en el front
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch)
      return res.status(400).json(["Credenciales Incorrectas"]);

    const foundRole = await Role.findOne({ _id: foundUser.role });

    if (!foundRole)
      return res.status(400).json(["Ha ocurrido un error "]);
    const token = await createWebToken({
      id: foundUser._id,
      role: foundRole._id,
    });
    res.cookie("token", token);
    res.status(201).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Error inesperado"]);
  }
};

export const logout = async (req, res) =>{
  res.cookie('token', "", {expires: new Date(0)});
  return res.status(200);
};
