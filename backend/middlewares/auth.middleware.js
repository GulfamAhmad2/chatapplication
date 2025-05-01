import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // if(!req.headers.authorization) return res.status(404).json("Token not found!")
  // const token = req.headers.authorization.split(" ")[1]
  try {
    const token = req.cookies.token;
    if(!token) return res.status(404).json("Token not found!")
    const decoded = jwt.verify(token, "gulfam");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json({ message: "invalid token" });
  }
};

export default authMiddleware;
