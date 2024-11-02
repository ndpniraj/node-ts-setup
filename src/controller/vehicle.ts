import VehicleSeat from "@/model/seat";
import Vehicle from "@/model/vehicle";
import { NewVehicleHandler } from "@/types";

export const registerVehicle: NewVehicleHandler = async (req, res) => {
  const { about, name, number, route, type, seating } = req.body;

  const leftSeatCounts = Number(seating.left.layout[0]) * seating.left.count;
  const rightSeatCounts = Number(seating.left.layout[0]) * seating.left.count;

  const leftSeat = Array(leftSeatCounts)
    .fill("L")
    .map((id, index) => ({ booked: false, seatId: `${id}${index + 1}` }));

  const rightSeat = Array(rightSeatCounts)
    .fill("R")
    .map((id, index) => ({ booked: false, seatId: `${id}${index + 1}` }));

  const vehicle = await Vehicle.create({ name, about, number, route, type });
  await VehicleSeat.create({
    vehicle: vehicle._id,
    left: leftSeat,
    right: rightSeat,
    driverPosition: seating.driverPosition,
    total: leftSeatCounts + rightSeatCounts,
  });
  res.json({ success: true });
};
