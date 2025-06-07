import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

const authMiddleware = async (req, res, next) => {
  
  // if(!req.headers.authorization) return res.status(404).json("Token not found!")
  // const token = req.headers.authorization.split(" ")[1]
  try {
    const token = req?.cookies?.token;
    console.log(token)
    if(!token) return res.status(404).json("Token not found!")
    const decoded = jwt.verify(token, "gulfam");
    const user = await User.findById(decoded.id); 
    if (!user) return res.redirect("/login");
    req.user = user; 
    next();
  } catch (err) {
    if(err.name === "TokenExpiredError"){
      return res.redirect("/login")
    }
    res.status(401).json({ message: "invalid token" });
  }
};

export default authMiddleware;
