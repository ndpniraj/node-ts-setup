import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(3, "Invalid name!"),
  email: z.string().trim().email("Invalid email address!"),
  password: z.string().min(5, "Password must be 5 chars long!"),
});

export const verificationSchema = z.object({
  otp: z.string().trim().min(6, "OTP must be 6 digit long!"),
  owner: z.string().transform((arg, ctx) => {
    if (!isValidObjectId(arg)) {
      ctx.addIssue({ code: "custom", message: "Invalid owner id!" });
      return z.NEVER;
    }

    return arg;
  }),
});

export const signinSchema = z.object({
  email: z.string().trim().email("Invalid email address!"),
  password: z.string(),
});

export const newAgencySchema = z.object({
  name: z
    .string({ required_error: "Name is required!" })
    .trim()
    .min(3, "Invalid name!"),
  about: z
    .string({ required_error: "About is required!" })
    .trim()
    .min(100, "About must be 100 chars long!"),
});

const singleSeatSchema = z.object({
  layout: z
    .string({ required_error: "Seat layout is required!" })
    .transform((val, ctx) => {
      try {
        const validLayout = ["1 by 1", "2 by 2", "3 by 3"];

        if (!validLayout.includes(val)) throw Error();

        return val;
      } catch (error) {
        ctx.addIssue({
          code: "custom",
          message: "Invalid seat layout!",
        });
        return z.NEVER;
      }
    }),
  count: z.number().nonnegative("Seat qty must be a valid number!"),
});

const vehicleSeatSchema = z.object({
  left: singleSeatSchema,
  right: singleSeatSchema,
  driverPosition: z.enum(["left", "right"], {
    required_error: "Driver position must be left/right!",
    message: "Driver position must be left/right!",
  }),
});

export const routeDetailSchema = z.object({
  state: z
    .string({ required_error: "State is required in route!" })
    .trim()
    .min(2, "Invalid state name!"),
  city: z
    .string({ required_error: "City is required in route!" })
    .trim()
    .min(2, "Invalid city name!"),
  place: z
    .string({ required_error: "Place is required in route!" })
    .trim()
    .min(2, "Invalid place name!"),
  detail: z
    .string({ invalid_type_error: "Detail must be type string!" })
    .trim(),
  time: z
    .string({ required_error: "Time is required!" })
    .transform((val, ctx) => {
      try {
        const timeList = val.split(":");
        if (timeList.length !== 3) {
          throw Error();
        }
        const hrs = Number(timeList[0]);
        const min = Number(timeList[1]);
        const period = timeList[2];
        const validPeriod = ["AM", "PM"];

        if (hrs <= 0 || hrs > 12) throw Error();
        if (min < 0 || min > 59) throw Error();
        if (!validPeriod.includes(period)) throw Error();
      } catch (error) {
        ctx.addIssue({
          code: "custom",
          message: "Time format must be HH:MM:AM/PM!",
        });
        return z.NEVER;
      }
    }),
});

export const VehicleSchema = z.object({
  name: z
    .string({ required_error: "Vehicle name is required!" })
    .trim()
    .min(3, "Invalid vehicle name!"),
  about: z
    .string({ required_error: "Vehicle about is required!" })
    .trim()
    .min(50, "Invalid vehicle about, use at least 50 characters!"),
  number: z
    .string({ required_error: "Vehicle number is required!" })
    .trim()
    .min(3, "Invalid vehicle number!"),
  type: z.string({ required_error: "Vehicle type is required!" }).trim(),
  // available: z.array(z.date()),
  route: z.object({
    pickup: routeDetailSchema,
    drop: routeDetailSchema,
    halt: z.array(routeDetailSchema).optional(),
  }),
  seating: vehicleSeatSchema,
});
