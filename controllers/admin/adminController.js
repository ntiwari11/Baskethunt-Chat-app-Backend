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

    // res.status(201).json({
    //   success: true,
    //   message: "Admin User Created Succesfully",
    //   user,
    // });

    // cookies Added
    const token = generateToken(user._id);

    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
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
        message: "Invalid Credentials OR User not found1",
        success: false,
      });
    }
    if (user && (await user.matchPassword(password))) {
      // res.json({
      //   _id: user._id,
      //   name: user.name,
      //   email: user.email,
      //   token: generateToken(user._id),
      //   message: " Admin Login Successfull",
      //   success: true,
      // });

      // cookies Added
      const token = generateToken(user._id);

      // options for cookie
      const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      res.status(201).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });
    } else {
      return res.status(404).json({
        message: "Invalid Credentials OR User not found2",
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
exports.getMySelfAdmin = async (req, res, next) => {
  try {
    const AdminUserDetails = req.user;
    console.log(AdminUserDetails);
    // const AdminUserDetails = await User.findById(req.user.id);

    res.status(200).json({ user: { AdminUserDetails } });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// update Admin profile

exports.updateAdminProfile = async (req, res) => {
  try {
    const { name } = req.body;
    // console.log(req.user);
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

// Logout USer
exports.logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfull.",
  });
};

// Get all users (admin)
exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
};
// Get single user details (admin)
exports.getSingleUsersDetails = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.json(404).status({
      success: false,
      message: `User does not exist with Id: ${req.params.id}`,
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
};

// delete a user by admin
exports.deleteUserByAdmin = (req, res) => {};
