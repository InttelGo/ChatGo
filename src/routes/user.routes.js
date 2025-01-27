import { Router } from "express";
import { authRequired, rolRequired } from "../middlewares/validateToken.js";

import {
    desactiveUser,
    getProfile,
    updatedAttributes,
    register
} from "../controllers/user.controller.js";

const router = Router();

router.post("/desactive", authRequired, rolRequired, desactiveUser);

router.post("/uploaded", authRequired, rolRequired, updatedAttributes);

router.post("/register", authRequired, rolRequired, register);

router.get("/consultprofile", authRequired, rolRequired, getProfile);

export default router;