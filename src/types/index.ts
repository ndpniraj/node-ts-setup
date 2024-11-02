import {
  newAgencySchema,
  signinSchema,
  signupSchema,
  VehicleSchema,
  verificationSchema,
} from "@/validator";
import { RequestHandler } from "express";
import { z } from "zod";

type SignUpHandlerBody = z.infer<typeof signupSchema>;
type VerificationHandlerBody = z.infer<typeof verificationSchema>;
type SignInHandlerBody = z.infer<typeof signinSchema>;
type NewAgencyHandlerBody = z.infer<typeof newAgencySchema>;
type NewVehicleHandlerBody = z.infer<typeof VehicleSchema>;

export type SignUpHandler = RequestHandler<{}, {}, SignUpHandlerBody>;
export type SignInHandler = RequestHandler<{}, {}, SignInHandlerBody>;
export type VerificationHandler = RequestHandler<
  {},
  {},
  VerificationHandlerBody
>;
export type NewAgencyHandler = RequestHandler<{}, {}, NewAgencyHandlerBody>;
export type NewVehicleHandler = RequestHandler<{}, {}, NewVehicleHandlerBody>;
