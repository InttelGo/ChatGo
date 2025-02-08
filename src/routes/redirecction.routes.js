import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

import {
  redirectTo,
} from "../controllers/redirecction.controller.js";

const router = Router();

router.put("/redirect", authRequired, redirectTo);

export default router;
