import { registerAgency } from "@/controller/agency";
import { isAuth } from "@/middleware/auth";
import { newAgencySchema, validate } from "@/validator";
import { Router } from "express";

const agencyRouter = Router();

agencyRouter.post(
  "/register",
  isAuth,
  validate(newAgencySchema),
  registerAgency
);

export default agencyRouter;
