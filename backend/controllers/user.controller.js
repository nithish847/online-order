import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;
    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phonenumber,
      password: hashpassword,
      role,
    });

    return res.status(200).json({
      message: "Account Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
   let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const ispasswordMatch = await bcrypt.compare(password, user.password);
    if (!ispasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullname}`,
        user,
        token,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    
    const user = req.user;

    res.status(200).json({
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
      },
      success: true,
    });
   
  } catch (error) {
    console.log(error)
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "buyer" }).select("-password");

    res.status(200).json({
      users,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const logout=async(req,res)=>{
  try {
    res.status(200).clearCookie("token",{httpOnly:true,sameSite:"strict",}).json({
      message:"Logged out successfully",
      success:"true"
    })

  } catch (error) {
    console.log(error)
  }
}