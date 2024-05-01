import jwt from "jsonwebtoken";
import { Model, Schema, model } from "mongoose";
import { getConfig } from "../../../config";
import { IUser } from "../interfaces";

interface IUserMethods extends Document {
  generateJWTToken: () => Promise<string>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.method("generateJWTToken", async function () {
  const jwtSecretKey = getConfig("jwtSecretKey") as string;
  const jwtExpiry = getConfig("jwtExpiry") as string;
  return await jwt.sign(
    {
      userId: this._id,
      email: this.email,
      role: this.role,
      name: this.name,
    },
    jwtSecretKey,
    {
      expiresIn: jwtExpiry,
      algorithm: "HS256",
    }
  );
});

export const User = model<IUser, UserModel>("User", userSchema);
