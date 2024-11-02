import User, { UserDoc } from "@/model/user";
import { formatUserProfile, sendErrorResponse } from "@/utils";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        name: string;
        email: string;
        role: UserDoc["role"];
        //   avatar?: string;
        //   signedUp: boolean;
        //   authorId?: string;
        //   books?: string[];
      };
    }
  }
}

export const isAuth: RequestHandler = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  // send error response if there is no token
  if (!authorizationHeader) {
    return sendErrorResponse({
      message: "Unauthorized request!",
      status: 401,
      res,
    });
  }

  // otherwise find out if the token is valid or signed by this same server
  const authToken = authorizationHeader.split("Bearer ")[1];
  // send error response if there is no token
  if (!authToken) {
    return sendErrorResponse({
      message: "Unauthorized request!",
      status: 401,
      res,
    });
  }

  const payload = jwt.verify(authToken, process.env.JWT_SECRET!) as {
    userId: string;
  };

  // if the token is valid find user from the payload
  // if the token is invalid it will throw error which we can handle
  // from inside the error middleware
  const user = await User.findById(payload.userId);
  if (!user) {
    return sendErrorResponse({
      message: "Unauthorized request user not found!",
      status: 401,
      res,
    });
  }

  req.user = formatUserProfile(user);

  next();
};

export const isAgency: RequestHandler = async (req, res, next) => {
  if (req.user.role === "agency-owner") next();
  else sendErrorResponse({ res, message: "Invalid task!", status: 403 });
};
