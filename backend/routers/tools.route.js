import { getAllTools, getTools, createTools, updateTools, deleteTools } from '../controllers/tools.controller.js'
import{ upload }from '../middlewares/upload.js';
import express from "express";

export const router = express.Router();

router.get('/', getAllTools);
router.get('/:toolsId', getTools);
router.post('/', createTools);
router.put('/:toolsId', upload.single('photo'), updateTools);
router.delete('/:toolsId', deleteTools);

export default router;