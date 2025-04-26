import express from 'express'
import {registerUser, loginUser, storePublicKey} from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post("/signup", registerUser)
router.post("/login", loginUser)
router.post("/store-public-key", authMiddleware, storePublicKey)

export default router