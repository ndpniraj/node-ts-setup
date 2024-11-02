import { HydratedDocument, model, Model, ObjectId, Schema } from "mongoose";

interface IAgency {
  name: string;
  about: string;
  owner: ObjectId;
  vehicles: ObjectId[];
}

type AgencyModel = Model<IAgency>;
export type AgencyDoc = HydratedDocument<IAgency>;

const schema = new Schema<IAgency, AgencyModel>(
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
    vehicles: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Vehicle",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Agency: AgencyModel = model<IAgency, AgencyModel>("Agency", schema);

export default Agency;
