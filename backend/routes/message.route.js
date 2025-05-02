import express from 'express' 
import { deleteMessages, getMessages, sendMessage } from '../controllers/message.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post("/", authMiddleware, sendMessage)
router.delete("/", authMiddleware, deleteMessages)
router.get("/", authMiddleware, getMessages)

export default router
