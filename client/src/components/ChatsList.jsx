import React, { useRef, useState, useEffect } from "react";
import { useChats } from "../context/ChatsContext";
import { useAuth } from "../context/AuthContext";
import moment from "moment";

function ChatsList() {
  const { chats, updateConversation, selectChat, getMessages } = useChats();
  const { user } = useAuth();
  useEffect(() => {
    chats;
  }, [chats]);

  const handleClick = (selectedChat) => {
    selectedChat.read = true;

    const userInParticipants = selectedChat.participants.some(
      (participant) => participant.user == user._id
    );

    if (!userInParticipants) {
      selectedChat.participants.push({
        user: user._id,
        lastActive: new Date(),
      });
    } else {
      // si ya existe el participante cambio la ultima actividad
      selectedChat.participants = selectedChat.participants.map(
        (participant) => {
          if (participant.user == user._id) {
            return { ...participant, lastActive: new Date() };
          }
          return participant;
        }
      );
    }

    // Actualizando la funcion en la base de datos
    updateConversation(selectedChat); // Llamando a la funcion del contexto
    console.log(selectedChat);
    selectChat({
      _id: selectedChat._id,
      read: selectedChat.read,
      participants: selectedChat.participants,
      client: selectedChat.client,
      createdAt: selectedChat.createdAt,
      updatedAt: selectedChat.updatedAt,
    });

    getMessages(selectedChat);
    chats;
  };
  const formatPhoneNumber = (number) => {
    if (!number) return "";

    return (
      number.slice(2, 5) +
      " " +
      number.slice(5, 8) +
      " " +
      number.slice(8, number.length)
    );
  };

  return (
    <div
      className="list-group"
      style={{ maxHeight: "40em", overflowY: "auto" }}
    >
      {chats && chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat._id}
            className="list-group-item list-group-item-action mb-3" // Added clickable class
            style={{ background: "transparent", cursor: "pointer" }} // Added cursor style
            onClick={() => handleClick(chat)} // Attach click handler
          >
            <div className="d-flex w-100 justify-content-between">
              <div>
                <h5>{formatPhoneNumber(chat.client?.number)}</h5>
              </div>
              <div className="d-flex align-items-center">
                <small className="text-muted">
                  {moment(chat.lastMessage.createdAt).fromNow()}
                </small>
                <span
                  className="material-symbols-rounded mx-1"
                  style={{ color: chat.read ? "#007BFC" : "#54656F" }}
                >
                  done_all
                </span>
              </div>
            </div>
            <div>
              <small classNames="text-muted">
                {chat.lastMessage?.message || "Mensaje previo"}
              </small>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">No hay chats disponibles</div>
      )}
    </div>
  );
}

export default ChatsList;
