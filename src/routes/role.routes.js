import { Router } from "express";
import { authRequired, rolRequired } from "../middlewares/validateToken.js";

import {
  createRole,
  getAllRoles
} from "../controllers/role.controller.js";

const router = Router();

router.post("/add/role", authRequired, rolRequired, createRole);

router.get("/role", authRequired, getAllRoles)

export default router;