import React, { createContext, useEffect, useContext } from "react";
import socket from "../api/sockets.js";
import { useChats } from "./ChatsContext.jsx";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { newChat, setAllMessages, setMessageInConversation, chats, chat, getChats} = useChats();

  useEffect(() => {
    socket.on("nueva_conversacion", (updatedConversations) => {
      if(chats.message != "No hay conversaciones"){
        newChat(updatedConversations);
      }else{
        getChats("679bcfc8130e6b38e4544ca8", 0);
      }
    });

    socket.on("mensaje_nuevo", (id, newMessage) => {
      if(chats.message != "No hay conversaciones"){
        setMessageInConversation(id, newMessage);
      }
      if(chat != null){
        if (id === chat._id) {
          setMessages(id, newMessage);
        }
      }
    });

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      socket.off("nueva_conversacion");
    };
  }, [newChat]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
