import { UserDoc } from "@/model/user";
import { Response } from "express";

export { sendVerificationMail } from "./mail";

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

type ErrorResponseType = {
  res: Response;
  message: string;
  status: number;
};

export const sendErrorResponse = ({
  res,
  message,
  status,
}: ErrorResponseType) => {
  res.status(status).json({ message });
};

export const formatUserProfile = (user: UserDoc) => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
