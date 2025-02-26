import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  console.log(req);
  const { token } = req.cookies;
  console.log("token:" + token);
  console.log("token exist: "+ token)
  if (!token) return res.status(401).json(["No token provided"]);
  jwt.verify(token, TOKEN_SECRET, (err, decode) => {
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
