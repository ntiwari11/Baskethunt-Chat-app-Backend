const User = require("../../Models/userModel");
import { generateToken } from "../../config/generateToken";

exports.adminWelcome = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to admin routes",
  });
};

// Admin Sign UP
exports.adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Your E-Mail Id is already Registered with Baskethunt",
        success: false,
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Admin User Created Succesfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// Admin Sign In
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid Credentials OR User not found",
        success: false,
      });
    }
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        message: " Admin Login Successfull",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Invalid Credentials OR User not found",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

//  Get Admin Details
exports.getMySelfAdmin = (req, res) => {
  try {
    const AdminUserDetails = req.user;
    return res.status(200).json({ user: { AdminUserDetails } });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// update Admin profile

exports.updateAdminProfile = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.user);
    let user = await User.findById(req.user._id).select("-password");
    const data = {
      name: name || user.name,
    };
    user = await User.findByIdAndUpdate(user._id, data, { new: true });
    return res.status(200).json({
      success: true,
      message: "your profile update successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// delete a user by admin
exports.deleteUserByAdmin = (req, res) => {};
