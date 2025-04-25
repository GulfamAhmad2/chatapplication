import express from 'express'
import {registerUser, loginUser} from '../controllers/user.controller.js'
import { test } from '../controllers/test.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import { authorizeRoles } from '../middlewares/role.middleware.js'

const router = express.Router()

router.get("/admin", authMiddleware, authorizeRoles(1), (req, res)=>{
    try {
    res.status(200).json("admin page")
        
    } catch (error) {
        res.status(500).json({message:"server err"})
    }
})
router.get("/moderator", authMiddleware, authorizeRoles(1, 2), (req, res)=>{
    try {
    res.status(200).json("moderator page")
        
    } catch (error) {
        res.status(500).json({message:"server err"})
    }
})
router.get("/", authMiddleware, authorizeRoles(1, 2, 3), (req, res)=>{
    try {
    res.status(200).json("user page")
        
    } catch (error) {
        res.status(500).json({message:"server err"})
    }
})

router.get("/", authMiddleware, test)

export default router