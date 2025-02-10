import jws from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.body;
  if (!token) return res.status(401).json(["No token provided"]);
  jws.verify(token, TOKEN_SECRET, (err, decode) => {
    if (err) return res.status(403).json(["Invalid token"]);
    req.user = { id: decode.id, role: decode.role };
    next();
  });
};

export const rolRequired = (req, res, next) => {
  if (req.user.role !== "67979b77faf243dbce544ca8")
    return res.status(403).json(["Acceso denegado"]);

  next();
};
