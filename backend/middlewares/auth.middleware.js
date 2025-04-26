import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  if (!token) return res.status(404).json("Token not found!")
  try {
    const decoded = jwt.verify(token, "gulfam");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json({ message: "invalid token" });
  }
};

export default authMiddleware;
