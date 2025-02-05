import React, { createContext, useEffect, useState } from "react";
import socket from "../api/sockets.js";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("mensaje", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("mensaje");
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, messages }}>
            {children}
        </SocketContext.Provider>
    );
};
