import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const userExists = await User.findOne({ username })
        if (userExists) return res.status(401).json({ message: "Username already exists!" })
        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)
        const newUser = new User({
            username,
            password: hashedPassword
        })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const isUser = await User.findOne({ username });
        if (!isUser) return res.status(404).json({ message: "Username not found!" });
        const isMatch = await bcrypt.compare(password, isUser.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });
        const token = jwt.sign({ id: isUser?._id, role: isUser?.role }, "gulfam", {
            expiresIn: "7d",
        });
        res.cookie("token", token, {
            httpOnly: false,
            secure: false, 
            sameSite: "Lax", 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });
        console.log(isUser._id)
        console.log("Login Done")
        res.status(200).json({ isUser, token });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const storePublicKey = async (req, res) => {
    const userId = req.user.id
    const { publicKey } = req.body
    try {
        if (!publicKey) {
            return res.status(400).json({ message: 'Public key is required' })
        }
        await User.findByIdAndUpdate(userId, { publicKey })
        res.status(201).json({message: "PublicKey has been updated."})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const userProfile = async (req, res) => {
    const userId = req.user.id
    console.log(userId)
    try {
        const userProfile = await User.findById(userId).select("-password")
        if (!userProfile) return res.status(404).json({message: "User profile not found!"})
        res.status(200).json(userProfile)
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}