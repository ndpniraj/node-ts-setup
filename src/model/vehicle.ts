import { HydratedDocument, model, Model, ObjectId, Schema } from "mongoose";

type RouteDetail = {
  state: string;
  city: string;
  place: string;
  detail: string;
  time: string;
};

interface IVehicle {
  name: string;
  about: string;
  number: string;
  type: string;
  available: Date[];
  // seating: ObjectId;
  route: {
    pickup: RouteDetail;
    drop: RouteDetail;
    halt: RouteDetail[];
  };
}

type VehicleModel = Model<IVehicle>;
export type VehicleDoc = HydratedDocument<IVehicle>;

const schema = new Schema<IVehicle, VehicleModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    route: {
      type: Object,
      required: true,
      pickup: {
        city: {
          type: String,
          required: true,
          trim: true,
        },
        place: {
          type: String,
          required: true,
          trim: true,
        },
        detail: {
          type: String,
          trim: true,
        },
      },
      drop: {
        city: {
          type: String,
          required: true,
          trim: true,
        },
        place: {
          type: String,
          required: true,
          trim: true,
        },
        detail: {
          type: String,
          trim: true,
        },
      },
    },
    // seating: {
    //   type: Schema.Types.ObjectId,
    //   ref: "VehicleSeat",
    // },
  },
  {
    timestamps: true,
  }
);

const Vehicle: VehicleModel = model<IVehicle, VehicleModel>("Vehicle", schema);

export default Vehicle;
