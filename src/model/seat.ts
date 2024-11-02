import { HydratedDocument, model, Model, ObjectId, Schema } from "mongoose";

type SingleSeat = { seatId: string; booked: boolean };
interface IVehicleSeat {
  vehicle: ObjectId;
  total: number;
  left: SingleSeat[];
  right: SingleSeat[];
  driverPosition: string;
}

type VehicleSeatModel = Model<IVehicleSeat>;
export type AgencyDoc = HydratedDocument<IVehicleSeat>;

const schema = new Schema<IVehicleSeat, VehicleSeatModel>(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    right: [
      {
        type: Object,
        seatId: {
          type: String,
          required: true,
        },
        booked: {
          type: Boolean,
          default: false,
        },
      },
    ],
    left: [
      {
        type: Object,
        seatId: {
          type: String,
          required: true,
        },
        booked: {
          type: Boolean,
          default: false,
        },
      },
    ],
    driverPosition: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VehicleSeat: VehicleSeatModel = model<IVehicleSeat, VehicleSeatModel>(
  "VehicleSeat",
  schema
);

export default VehicleSeat;
