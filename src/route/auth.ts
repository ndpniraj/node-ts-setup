import { sendAuthProfile, signIn, signUp, verifyOTP } from "@/controller/auth";
import { isAuth } from "@/middleware/auth";
import {
  signinSchema,
  signupSchema,
  validate,
  verificationSchema,
} from "@/validator";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/", isAuth, sendAuthProfile);
authRouter.post("/sign-up", validate(signupSchema), signUp);
authRouter.post("/verify", validate(verificationSchema), verifyOTP);
authRouter.post("/sign-in", validate(signinSchema), signIn);

export default authRouter;
