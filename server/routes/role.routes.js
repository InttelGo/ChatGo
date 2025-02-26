import { Router } from "express";
import { authRequired, rolRequired } from "../middlewares/validateToken.js";

import {
  createRole,
  getAllRoles
} from "../controllers/role.controller.js";

const router = Router();

router.post("/add", authRequired, rolRequired, createRole);

router.post("/", authRequired, getAllRoles);

export default router;