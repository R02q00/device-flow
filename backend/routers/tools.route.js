import { getAllTools, getTools, createTools, updateTools, deleteTools } from '../controllers/tools.controller.js'
import express from "express";

const router = express.Router();

router.get('/', getAllTools);
router.get('/:toolsId', getTools)
router.post('/', createTools)
router.put('/:toolsId', updateTools)
router.delete('/:toolsId', deleteTools)

export default router;