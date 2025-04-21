import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorizations?.split(" ")[1]
    if(!token) return res.status(400).json({message: "Token not found!"})
    try {
        const decoded = jwt.verify(token, "secret-here")
        req.user = decoded
        next()
    } catch(error) {
        return res.status(401).json({message: "Invalid token"})
    }
}

export default authMiddleware