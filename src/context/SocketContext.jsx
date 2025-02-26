import React, { createContext, useEffect, useContext } from "react";
import socket from "../api/sockets.js";
import { useChats } from "./ChatsContext.jsx";
import { useRoles } from "./RoleContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const {
    newChat,
    getMessages,
    setMessageInConversation,
    chats,
    chat,
    getChats,
    setSuccess,
    success,
    deleteChatToChats
  } = useChats();

  const { getRoles, roles, setSelectedRole } = useRoles();

  useEffect(() => {
    socket.on("nueva_conversacion", (updatedConversations) => {
      if (chats.message != "No hay conversaciones") {
        newChat(updatedConversations);
      } else {
        getChats("679bcfc8130e6b38e4544ca8", 0);
      }
      getRoles();
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

    socket.on("redirected", (res) => {
      console.log(res);
      if (chats.message != "No hay conversaciones") {
        setMessageInConversation(res.chatId, res.lastItem);
        deleteChatToChats(res.chatId);
      }
      setSuccess([...success,
        {
          client: res.client,
          from: res.lastItem.from,
          to: res.lastItem.to,
          reason: res.lastItem.reason,
        },
      ]);
      getRoles();
    });

    socket.on("conversacion_actualizada", (res) => {
      console.log(res);
      if(res){
        getRoles();
        getChats(res, 0);
      }
    })

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      socket.off("nueva_conversacion");
      socket.off("mensaje_nuevo");
      socket.off("redirected");
      socket.off("conversacion_actualizada");
    };
  }, [newChat, setMessageInConversation, chat]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
