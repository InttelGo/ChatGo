import React, { createContext, useState, useContext, useEffect } from "react";
import {
  chatRequest,
  chatRequestUpdate,
  messagesRequest,
  chatRedirectUpdate,
  sendMessageRequest,
  newMessagesUserRequest,
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
  const [success, setSuccess] = useState([]);
  const [chat, setchat] = useState(null);
  const [filteredChats, setFilteredChats] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setFilteredChats(chats); // Inicialmente, los chats filtrados son todos los chats
  }, [chats]);

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
    } catch (error) {
      console.error("Error in updateChat:", error.message); // Use console.error for errors
      setErrors(error.response?.data || error.message); // Improved error handling
    }
  };

  const selectChat = (selectedChat) => {
    setchat(selectedChat);
  };

  const getMessages = async (selectedChat) => {
    try {
      const res = await messagesRequest({
        token: cookies.token,
        chat: selectedChat,
      });
      setMessages(res.data.items);
    } catch (error) {
      console.error("Error in getMessages:", error.message); // Use console.error for errors
      setErrors(error.response?.data || error.message); // Improved error handling
    }
  };

  const addNewMessageInChat = (newMessage) => {
    try {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
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

      if (res.status === 201) {
        setchat(null);
      }
    } catch (error) {
      console.error("Error in redirectChat:", error.message); // Use console.error for errors
      setErrors(error.response?.data || error.message); // Improved error handling
    }
  };

  const searchChats = async (search) =>{
    if(!search){
      setFilteredChats(chats)
    }else{
      const results = chats.filter((chat) => {
        if (chat.client && chat.client.number && chat.client.number.toString().toLowerCase().includes(search)) {
          return true;
        }
        return false;
      });
    
      setFilteredChats(results);
    }
  }

  const setMessageInConversation = async (idChat, newMessage) => {
    try {
      setChats((prevChats) => {
        const updatedChats = Array.isArray(prevChats) ? [...prevChats] : [];
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
      console.log(chat);
    } catch (error) {
      console.error("Error in setMessageInConversation:", error.message);
      setErrors(error.response?.data || error.message);
    }
  };

  const sendMessageUser = async (chat, message) => {
    try {
      let response = await sendMessageRequest({
        messaging_product: "whatsapp",
        to: chat.client.number,
        type: "text",
        text: {
          body: message,
        },
      });

      if (response.status != 200) {
        console.log("Error enviando el mensaje:", response.data);
        return;
      }

      console.log(chat, message)

      response = newMessagesUserRequest({
        token: cookies.token,
        chat: chat,
        message: message,
      });

      if (response.status != 200) {
        console.log("Error al guardar el mensaje:", response.data);
        return;
      }

      console.log("Mensaje enviado con éxito:", response.data);
    } catch (error) {
      console.error(
        "Error enviando el mensaje:",
        error.response?.data || error
      );
    }
  };

  const deleteChatToChats = (chatId) => {
    console.log(chats.filter((chat) => chat._id !== chatId));
    setChats((prevChats) => {
      return prevChats.filter((chat) => chat._id !== chatId);
    });
  };

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
        deleteChatToChats,
        success,
        setSuccess,
        updateConversation,
        setMessageInConversation,
        selectChat,
        messages,
        filteredChats,
        sendMessageUser,
        searchChats,
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
