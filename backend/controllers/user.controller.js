import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    const {username, password} = req.body
    try {
        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)
        const newUser = new User({
            username,
            password: hashedPassword
        })
        await newUser.save()
        res.status(201).json(newUser)
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const loginUser = async (req, res) => {
    const {username, password} = req.body
    try {
        const isUser = await User.findOne({username})
        if (!isUser) return res.status(404).json({message: "User not found!"})
        const isMatch = await bcrypt.compare(password, isUser.password)
        if (!isMatch) return res.status(401).json({message: "Invalid credentials"})
        let token = jwt.sign({id: isUser._id}, "secret-here", {expiresIn: "3d"})
        res.status(200).json({isUser, token})
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}