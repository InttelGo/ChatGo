export default (io) => {
  // Evento de conexión de socket
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    socket.on("mensaje", (data) => {
      console.log("Mensaje recibido:", data);
      io.emit("mensaje", data); // Reenviar a todos los clientes
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });
};
