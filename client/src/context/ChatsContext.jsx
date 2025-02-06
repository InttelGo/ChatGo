import React, { createContext, useState, useContext, useEffect } from "react";
import {
  chatRequest,
  chatRequestUpdate,
  messagesRequest,
  chatRedirectUpdate,
} from "../api/chats.js";
import { useCookies } from "react-cookie";

const ChatContext = createContext();

const useChats = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChats must be used within a ChatProvider");

  return context;
};

const ChatsProvider = ({ children }) => {
  // REMOVE async here
  const [cookies] = useCookies(["token"]);
  const [chats, setChats] = useState([]);
  const [errors, setErrors] = useState([]);
  const [chat, setchat] = useState(null);
  const [messages, setMessages] = useState([]);

  const getChats = async (idRole, filter) => {
    try {
      const res = await chatRequest({
        token: cookies.token,
        role: idRole,
        state: filter,
      });
      setChats(res.data);
    } catch (error) {
      console.error("Error in getChats:", error.message); // Use console.error for errors
      setErrors(error.response?.data || error.message); // Improved error handling
    }
  };

  const updateConversation = async (conversation) => {
    try {
      const res = await chatRequestUpdate({
        token: cookies.token,
        conversation: conversation,
      });
      setchat(res);
    } catch (error) {
      console.error("Error in updateChat:", error.message); // Use console.error for errors
      setErrors(error.response?.data || error.message); // Improved error handling
    }
  };

  const selectChat = async (selectedChat) => {
    setchat(selectedChat);
  };

  const getMessages = async (selectedChat) => {
    try {
      console.log(selectedChat);
      const res = await messagesRequest({
        token: cookies.token,
        chat: selectedChat,
      });
      setMessages(res.data);
    } catch (error) {
      console.error("Error in getMessages:", error.message); // Use console.error for errors
      setErrors(error.response?.data || error.message); // Improved error handling
    }
  };

  const setAllMessages = async (idChat, newMessage) => {
    console.log(newMessage);
  }

  const redirectChat = async (chat, redirect) => {
    try {
      const res = await chatRedirectUpdate({
        token: cookies.token,
        conversation: chat,
        redirections: redirect,
      });
      console.log(res.data);
    } catch (error) {
      console.error("Error in redirectChat:", error.message); // Use console.error for errors
      setErrors(error.response?.data || error.message); // Improved error handling
    }
  };

  const setMessageInConversation = async (idChat, newMessage) => {

  };

  const newChat = (newConversations) => {
    // Convertir en array si es un solo objeto
    const conversationsArray = Array.isArray(newConversations)
      ? newConversations
      : [newConversations];

    setChats((prevChats) => {
      let updatedChats = [...prevChats];

      conversationsArray.forEach((newChat) => {
        // Buscar índice del chat en la lista
        const index = updatedChats.findIndex( 
          (chat) => chat._id === newChat._id
        );

        if (index !== -1) {
          // Eliminar chat existente
          updatedChats.splice(index, 1);
        }

        // Agregar siempre el chat al inicio
        updatedChats.unshift(newChat);
      });

      return updatedChats;
    });
  };

  return (
    <ChatContext.Provider
      value={{
        getChats,
        chats,
        chat,
        errors,
        updateConversation,
        setMessageInConversation,
        selectChat,
        messages,
        setAllMessages,
        getMessages,
        redirectChat,
        newChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatsProvider;
export { ChatContext, useChats };
