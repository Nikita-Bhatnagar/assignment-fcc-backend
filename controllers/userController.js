import User from "./../models/userModel.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import asyncHandler from "express-async-handler";

export const signup = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  const userExists = await User.find({ email });

  if (userExists.length > 0) {
    res.status(400);

    throw new Error("Email id already exists");
  }
  const newUser = await User.create({ email, name, password });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
  if (newUser)
    res.status(201).json({
      status: "success",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        token,
      },
    });
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleLogin = asyncHandler(async (req, res) => {
  const idToken = req.body.idToken;

  const response = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email_verified, name, email } = response.payload;

  if (email_verified) {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      return res
        .status(400)
        .json({ status: "fail", message: "User not found." });
    }
  } else {
    res.status(400).json({ status: "fail", message: "Error in sign in" });
  }
});

export const googleSignup = asyncHandler(async (req, res) => {
  const idToken = req.body.idToken;

  const response = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email_verified, name, email } = response.payload;

  if (email_verified) {
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(400)
        .json({ status: "fail", message: "Email id already exists" });
    } else {
      const password = email + process.env.JWT_SECRET;
      const newUser = await User.create({ email, name, password });
      if (newUser) {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        return res.status(201).json({
          token,
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
          },
        });
      }
    }
  } else {
    return res
      .status(400)
      .json({ status: "fail", message: "Error in sign up" });
  }
});
