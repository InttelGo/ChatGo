import { io } from "socket.io-client";

const socket = io("https://meta.internetdedicado.com.co:8443/", {
    secure: true,
    transports: ["websocket", "polling"]
});

export default socket;