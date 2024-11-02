import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { model, Model, ObjectId, Schema } from "mongoose";

interface IToken {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): boolean;
}

type TokenModel = Model<IToken, {}, Methods>;

const schema = new Schema<IToken, TokenModel, Methods>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    createdAt: {
      type: Date,
      expires: 3600, // 60 min * 60 sec = 3600s
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  if (this.isModified("token")) {
    const salt = genSaltSync(10);
    this.token = hashSync(this.token, salt);
  }

  next();
});

schema.methods.compareToken = function (token) {
  return compareSync(token, this.token);
};

const VerificationToken: TokenModel = model<IToken, TokenModel>(
  "VerificationToken",
  schema
);

export default VerificationToken;
