import express from 'express'
import {registerUser, loginUser, storePublicKey, userProfile} from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import { authorizeRoles } from '../middlewares/role.middleware.js'

const router = express.Router()

router.post("/signup", registerUser)
router.post("/login", loginUser)
router.get("/profile", authMiddleware, userProfile)
router.post("/store-public-key", authMiddleware, storePublicKey)

export default router