import User from "@/model/user";
import VerificationToken from "@/model/verificationToken";
import { SignInHandler, SignUpHandler, VerificationHandler } from "@/types";
import {
  formatUserProfile,
  generateOTP,
  sendErrorResponse,
  sendVerificationMail,
} from "@/utils";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const sendAuthProfile: RequestHandler = (req, res) => {
  res.json({ success: true, profile: req.user });
};

export const signUp: SignUpHandler = async (req, res) => {
  const { email, name, password } = req.body;

  const user = await User.create({ email, name, password });

  const otp = generateOTP();
  await VerificationToken.create({ owner: user._id, token: otp });
  await sendVerificationMail(email, otp);
  res.json({ success: true, profile: formatUserProfile(user) });
};

export const verifyOTP: VerificationHandler = async (req, res) => {
  const { otp, owner } = req.body;

  const token = await VerificationToken.findOne({ owner });
  if (!token?.compareToken(otp))
    return sendErrorResponse({
      res,
      status: 403,
      message: "Invalid verification token!",
    });

  await User.findByIdAndUpdate(owner, { verified: true });
  res.json({ success: true });
};

export const signIn: SignInHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user?.comparePassword(password))
    return sendErrorResponse({
      res,
      status: 403,
      message: "email/password mismatch!",
    });

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });

  res.json({
    success: true,
    profile: formatUserProfile(user),
    token: jwtToken,
  });
};
