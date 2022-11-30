import { Request, Response, Router } from "express";
import { deleteItem, getItem, getItems, postItem, updateItem } from "../controllers/item.controller";
import { logMiddleWare } from "../middleware/log.middleware";
import { checkJwtSession } from "../middleware/session.middleware";

const router = Router();

router.get('/', logMiddleWare,getItems);
router.get('/:id', logMiddleWare, getItem);
router.post('/',checkJwtSession, logMiddleWare,postItem);
router.put('/:id', logMiddleWare, updateItem);
router.delete('/:id', logMiddleWare, deleteItem);

export { router };