import React, { createContext, useState, useContext, useEffect } from "react";
import {
  chatRequest,
  chatRequestUpdate,
  messagesRequest,
  chatRedirectUpdate,
  sendMessageRequest
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
      const res = await messagesRequest({
        token: cookies.token,
        chat: selectedChat,
      });
      console.log(res);
      setMessages(res.data);
    } catch (error) {
      console.error("Error in getMessages:", error.message); // Use console.error for errors
      setErrors(error.response?.data || error.message); // Improved error handling
    }
  };

  const addNewMessageInChat = (newMessage) => {
    try {
      console.log(messages)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log(messages)
    } catch (error) {
      console.error("Error in addNewMessageInChat:", error.message);
      setErrors(error.response?.data || error.message);
    }
  };
  
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
    try {
      setChats((prevChats) => {
        // Verificar si prevChats es un array, si no, asignar un array vacío
        const updatedChats = Array.isArray(prevChats) ? [...prevChats] : [];

        // Encontrar el índice del chat en la lista
        const index = updatedChats.findIndex((chat) => chat._id === idChat);

        if (index !== -1) {
          // Extraer el chat, actualizarlo y moverlo al principio
          let chatToUpdate = { ...updatedChats[index] };

          // Actualizar las propiedades necesarias
          chatToUpdate.read = false;
          chatToUpdate.lastMessage = newMessage;

          // Eliminar el chat de su posición actual y colocarlo al inicio
          updatedChats.splice(index, 1);
          updatedChats.unshift(chatToUpdate);
        }

        return updatedChats;
      });
    } catch (error) {
      console.error("Error in setMessageInConversation:", error.message);
      setErrors(error.response?.data || error.message);
    }
  };

  const sendMessageUser = async (number, textValue) => {
    console.log(textValue);
    try {
      const response = await sendMessageRequest(
        {
          messaging_product: "whatsapp",
          to: number,
          type: "text",
          text: {
            body: textValue
          },
        }
      );

      console.log("Mensaje enviado con éxito:", response.data);
    } catch (error) {
      console.error("Error enviando el mensaje:", error.response?.data || error);
    }
  }
  const newChat = (newChat) => {
    setChats((prevChats) => {
      let updatedChats = [...prevChats];
      // Agregar siempre el chat al inicio
      updatedChats.unshift(newChat);
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
        sendMessageUser,
        addNewMessageInChat,
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
