import React, { createContext, useEffect, useContext } from "react";
import socket from "../api/sockets.js";
import { useChats } from "./ChatsContext.jsx";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const {
    newChat,
    getMessages,
    setMessageInConversation,
    chats,
    chat,
    getChats,
  } = useChats();

  useEffect(() => {
    socket.on("nueva_conversacion", (updatedConversations) => {
      if (chats.message != "No hay conversaciones") {
        newChat(updatedConversations);
      } else {
        getChats("679bcfc8130e6b38e4544ca8", 0);
      }
    });

    socket.on("mensaje_nuevo", (res) => {
      if (chats.message != "No hay conversaciones") {
        setMessageInConversation(res.conversationId, res.newMessage);
      }
      if (chat != null) {
        if (res.conversationId === chat._id) {
          setMessageInConversation(res.conversationId, res.newMessage);
          getMessages({
            _id: chat._id,
            read: chat.read,
            participants: chat.participants,
            client: chat.client,
            createdAt: chat.createdAt,
            updatedAt: chat.updatedAt,
          });
        }
      }
    });

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      socket.off("nueva_conversacion");
      socket.off("mensaje_nuevo");
    };
  }, [newChat, setMessageInConversation, chat]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
