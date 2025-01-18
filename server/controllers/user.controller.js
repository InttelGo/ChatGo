const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const verifyUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica si el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Compara la contraseña encriptada ingresada con la almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token con el ID del usuario
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "2h" });

    //Si todo es correcto mostrar el mensaje de login
    res.status(200).json({ message: "Login exitoso", 
        token,
        user: {id: user.id, username: user.username}
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
