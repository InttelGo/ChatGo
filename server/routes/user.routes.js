import { Router } from "express";
import { 
    verifyUser,
    getUser
} from "../controllers/user.controller.js";
const router = Router();

router.post('/user/login/', verifyUser);
router.get('/user/', getUser);

export default router;