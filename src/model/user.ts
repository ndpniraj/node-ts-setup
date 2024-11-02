import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { HydratedDocument, model, Model, Schema } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  role: "user" | "admin" | "agency-owner";
}

interface Methods {
  comparePassword(password: string): boolean;
}

type UserModel = Model<IUser, {}, Methods>;
export type UserDoc = HydratedDocument<IUser, Methods>;

const schema = new Schema<IUser, UserModel, Methods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "agency-owner"],
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = genSaltSync(10);
    this.password = hashSync(this.password, salt);
  }

  next();
});

schema.methods.comparePassword = function (password) {
  return compareSync(password, this.password);
};

const User: UserModel = model<IUser, UserModel>("User", schema);

export default User;
