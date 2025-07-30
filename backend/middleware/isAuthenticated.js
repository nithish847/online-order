import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded.userId).select("-password");
     if (!req.user) {
      return res.status(401).json({ message: "User not found", success: false });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", success: false });
  }
};
