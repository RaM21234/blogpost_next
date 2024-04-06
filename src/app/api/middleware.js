import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  // Get token from request headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify JWT token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // If token is valid, attach user information to request object
    req.user = decoded;
    next();
  });
}
