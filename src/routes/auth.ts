import { Router } from "express";
import { registerCtrl, loginCtrl } from "../controllers/auth.controller";
import { logMiddleWare } from "../middleware/log.middleware";
const router = Router();

router.post('/register', logMiddleWare, registerCtrl);
router.post('/login', logMiddleWare, loginCtrl);

export { router };