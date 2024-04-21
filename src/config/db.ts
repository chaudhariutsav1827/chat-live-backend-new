import mongoose from "mongoose";
import { getConfig } from "./env-config";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("[MONGO_DB]: Database Connected successfully");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to database.", err);
    });
    await mongoose.connect(getConfig("connectionString") as string);
  } catch (err) {
    console.error("Failed to connect to database.", err);
    process.exit(1);
  }
};
