import { Server } from "socket.io";
import { server } from "../../../../server";

let socketServer: Server;
export const startSocket = () => {
  socketServer = new Server(server, { cors: { origin: "*" } });
  socketServer.on("connection", (socket) => {
    socket.on("join", function (userId) {
      socket.join(userId);
    });
  });
};

export { socketServer };
