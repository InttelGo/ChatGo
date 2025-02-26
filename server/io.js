import { Server as SocketIOServer } from "socket.io";

let io;

export const initIO = (server) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT"],
    },
  });
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io no está inicializado");
  }
  return io;
};