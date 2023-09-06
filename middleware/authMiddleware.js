// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
import User from "../Models/userModel";

exports.isAuthenticatedUsers = async (req, res, next) => {
  // Cookies authentication
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Un-Authorize, Token expired. Please Login or Register",
    });
    // throw new Error("Not authorized, no token. Please Login or Register");
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);

  next();
};

// authorize roles by admin
exports.authorizeRolesAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role : ${req.user.role} is not allowed to access this resource`,
      });
    }
    next();
  };
};
