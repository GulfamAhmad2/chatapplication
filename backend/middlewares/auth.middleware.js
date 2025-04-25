import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const headerToken = req.headers.auth || req.headers.Auth;
  // console.log(headerToken)
  if (!headerToken) return res.status(404).json({ message: "token not found" });
  const token = headerToken.split(" ")[1];
  console.log(token)
  try {
    const decode = jwt.verify(token, "gulfam");
    req.user = decode;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(500).json({ message: "invalid token" });
  }
};

export default authMiddleware;
