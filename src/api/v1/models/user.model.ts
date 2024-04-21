import jwt from "jsonwebtoken";
import { Schema, model } from "mongoose";
import { getConfig } from "../../../config";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    friends: {
      type: Array<Schema.Types.ObjectId>,
      ref: "User",
    },
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
    },
    jwtSecretKey,
    {
      expiresIn: jwtExpiry,
      algorithm: "HS256",
    }
  );
});

export const user = model("User", userSchema);
