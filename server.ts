import { Server } from "socket.io";
import { startSocket } from "./src/api/v1/services/socket.service";
import app from "./src/app";
import { connectDB, getConfig } from "./src/config";
import { createServer } from "http";

export const server = createServer(app);

const startServer = async () => {
  await connectDB();
  const port = getConfig("port");
  startSocket();  
  
  server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

startServer();
