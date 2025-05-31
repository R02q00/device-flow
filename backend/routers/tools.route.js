import { getAllTools, getTools, createTools, updateTools, deleteTools } from '../controllers/tools.controller.js'
import upload from '../middlewares/upload.js';
import express from "express";

const router = express.Router();

router.get('/', getAllTools);
router.get('/:toolsId', getTools)
router.post('/', upload.single('image'), createTools)
router.put('/:toolsId', upload.single('image'), updateTools)
router.delete('/:toolsId', deleteTools)

export default router;