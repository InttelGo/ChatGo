import { Router } from "express";
import { 
    setClient,
    getClient
} from "../controllers/client.controller.js";
const router = Router();

router.post('/client/', setClient);
router.get('/client/', getClient);

export default router;