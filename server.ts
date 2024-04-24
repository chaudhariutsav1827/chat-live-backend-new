import app from "./src/app";
import { connectDB, getConfig } from "./src/config";
import { createServer } from "http";
import { Server } from "socket.io";

const startServer = async () => {
  await connectDB();
  const port = getConfig("port");
  const server = createServer(app);

  const socketServer = new Server(server, { cors: { origin: "*" } });
  socketServer.on("connection", (socket) => {
    console.log("connected: ", socket.id);
  });

  server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

startServer();
