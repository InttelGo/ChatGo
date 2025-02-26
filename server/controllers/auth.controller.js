import User from "../models/User.model.js";
import Role from "../models/Role.model.js";
import bcrypt from "bcryptjs";
import { createWebToken } from "../libs/jws.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json(["Username and password are required"]);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    console.log(passwordHash);

    const foundUser = await User.findOne({ username });
    if (!foundUser) return res.status(400).json(["Invalid credentials"]);

    if (!foundUser.state) return res.status(401).json(["Inactive user"]);

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) return res.status(400).json(["Invalid credentials"]);

    const foundRole = await Role.findOne({ _id: foundUser.role });
    if (!foundRole) return res.status(500).json(["An error occurred"]);

    const token = await createWebToken({
      id: foundUser._id,
      role: foundRole._id,
    });

    // Guarda la cookie
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      path: "/",
    });

    // Retorna el token en la respuesta
    res.status(200).json({
      message: "Login successful",
      user: foundUser, // Enviar los datos del usuario si es necesario
      token, // Enviar el token explícitamente
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(["An error occurred"]);
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200); // Use sendStatus for no-body responses
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);

  console.error(token);
  if (!token) return res.status(401).json(["No token provided"]);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(403).json(["Invalid token"]);

    const userfound = await User.findById(user.id);
    if (!userfound) return res.status(404).json(["User not found"]);

    return res.json({
      _id: userfound._id,
      name: userfound.name,
      role: userfound.role,
    });
  });
};
