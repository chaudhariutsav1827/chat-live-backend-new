import app from "./src/app";
import { config } from "dotenv";
import { connectDB } from "./src/config";

config();

const startServer = async () => {
  await connectDB();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

startServer();
