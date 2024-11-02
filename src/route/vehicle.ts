import { registerVehicle } from "@/controller/vehicle";
import { isAgency, isAuth } from "@/middleware/auth";
import VehicleSeat from "@/model/seat";
import Vehicle, { VehicleDoc } from "@/model/vehicle";
import { sendErrorResponse } from "@/utils";
import { validate, VehicleSchema } from "@/validator";
import { Router } from "express";

const vehicleRouter = Router();

vehicleRouter.post(
  "/register",
  isAuth,
  isAgency,
  validate(VehicleSchema),
  registerVehicle
);
vehicleRouter.get("/seat", async (req, res) => {
  const result = await VehicleSeat.findById(
    "6707bccf48ab16b21d45c8ed"
  ).populate<{ vehicle: VehicleDoc }>("vehicle");

  if (!result)
    return sendErrorResponse({ message: "Not found", res, status: 404 });

  res.json({
    id: result.vehicle._id,
    name: result.vehicle.name,
    about: result.vehicle.about,
    number: result.vehicle.number,
    type: result.vehicle.type,
    route: {
      pickup: result.vehicle.route.pickup,
      drop: result.vehicle.route.drop,
    },
    seats: {
      total: result.total,
      left: result.left,
      right: result.right,
      driverPosition: result.driverPosition,
    },
  });
});

export default vehicleRouter;
