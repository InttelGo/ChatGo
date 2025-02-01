import { Router } from "express";

import { login, logout, verifyToken } from "../controllers/auth.controller.js";

import { validateSchema } from "../middlewares/validator.middlewares.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();
router.post("/login", validateSchema(loginSchema), login);
router.post("/auth/verifyToken", verifyToken);
router.post("/logout", logout);

export default router;
