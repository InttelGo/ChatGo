import { Router } from "express";
import { authRequired, rolRequired } from "../middlewares/validateToken.js";

import {
    getProfile,
    updatedAttributes,
    register
} from "../controllers/user.controller.js";

const router = Router();

router.put("/update/:id", authRequired, rolRequired, updatedAttributes);

router.post("/register", authRequired, rolRequired, register);

router.get("/consultprofile", authRequired, rolRequired, getProfile);

export default router;