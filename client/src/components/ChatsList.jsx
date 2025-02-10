import React, { useRef, useState, useEffect } from "react";
import { useChats } from "../context/ChatsContext";
import { useAuth } from "../context/AuthContext";
import moment from "moment";

function ChatsList() {
  const { chats, updateConversation, selectChat, getMessages } = useChats();
  const { user } = useAuth();
  const [filteredChats, setFilteredChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Inicialmente, los chats filtrados son todos los chats
    filterChats(); // Llama a la función de filtrado al cargar los chats
  }, [chats, searchTerm]); // Depende de chats y searchTerm

  const filterChats = () => {
    if (!chats) return; // Salir si chats aún no se ha cargado

    if (!searchTerm) {
      setFilteredChats(chats);
      return;
    }

    const term = searchTerm.toLowerCase();

    const filtered = chats.filter((chat) => {
      const number = chat.client?.number?.toString().toLowerCase() || ""; // Manejo de undefined
      const lastMessage = chat.lastMessage?.message?.toLowerCase() || ""; // Manejo de undefined
      const clientName = chat.client?.name?.toLowerCase() || ""; // Manejo de undefined

      return (
        number.includes(term) ||
        lastMessage.includes(term) ||
        clientName.includes(term)
      );
    });

    setFilteredChats(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (selectedChat) => {
    // ... (Tu código para marcar como leído y actualizar participantes)
    updateConversation(selectedChat);
    selectChat({
      _id: selectedChat._id,
      read: selectedChat.read,
      participants: selectedChat.participants,
      client: selectedChat.client,
      createdAt: selectedChat.createdAt,
      updatedAt: selectedChat.updatedAt,
    });

    getMessages(selectedChat);
  };

  const formatPhoneNumber = (number) => {
    // ... (Tu función para formatear el número de teléfono)
    if (!number) return "";

    return (
      number.slice(2, 5) +
      " " +
      number.slice(5, 8) +
      " " +
      number.slice(8, number.length)
    );
  };

  const resaltarTexto = (texto) => {
    if (!searchTerm || !texto.toLowerCase().includes(searchTerm.toLowerCase())) {
      return texto; // No hay filtro o no hay coincidencia
    }

    const indice = texto.toLowerCase().indexOf(searchTerm.toLowerCase());
    const parteResaltada = texto.substring(indice, indice + searchTerm.length);

    return (
      <>
        {texto.substring(0, indice)}
        <strong>{parteResaltada}</strong>
        {texto.substring(indice + searchTerm.length)}
      </>
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar chats..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control mb-3" // Añade un poco de margen inferior
      />
      <div
        className="list-group"
        style={{ maxHeight: "40em", overflowY: "auto" }}
      >
        {filteredChats && filteredChats.length > 0 ? ( // Usa filteredChats aquí
          filteredChats.map((chat) => {
            // Usa filteredChats aquí
            const lastMessageToShow = chat.lastMessage;

            return (
              <div
                key={chat._id}
                className="list-group-item list-group-item-action mb-3"
                style={{ background: "transparent", cursor: "pointer" }}
                onClick={() => handleClick(chat)}
              >
                {/* ... (El resto del código para mostrar la información del chat) */}
                <div className="d-flex w-100 justify-content-between">
                  <div>
                    {resaltarTexto(formatPhoneNumber(chat.client?.number))}
                  </div>
                  <div className="d-flex align-items-center">
                    <small className="text-muted">
                      {moment(lastMessageToShow?.createdAt).fromNow()}
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
                  <small className="text-muted">
                    {lastMessageToShow?.typeMessage === "messages"
                      ? lastMessageToShow.message
                      : lastMessageToShow?.typeMessage === "redirections"
                      ? `${lastMessageToShow.from} redirecciono a ${lastMessageToShow.to}, motivo: ${lastMessageToShow.reason}`
                      : lastMessageToShow.from +
                        ": " +
                        lastMessageToShow.message}
                  </small>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">No hay chats disponibles</div>
        )}
      </div>
    </div>
  );
}

export default ChatsList;
