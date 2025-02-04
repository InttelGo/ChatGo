import React, { useRef, useState, useEffect } from "react";
import { useChats } from "../context/ChatsContext";
import { useAuth } from "../context/AuthContext";
import { useUsers } from "../context/UsersContext";
import { PrimaryButtonOutline, PrimaryButton } from "../components/Buttons";
import UserModal from "../components/UserModal";
import Logo from "../assets/img/Logo.png";

function Conversation() {
  const { chats, chat, messages, redirectChat } = useChats();
  const { user } = useAuth();
  const { groups, getGroups } = useUsers();
  const [isGroupsInputVisible, setIsGroupsInputVisible] = useState(false);
  const [isFileInputVisible, setIsFileInputVisible] = useState(false);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [messageSend, setMessageSend] = useState("");
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [selectedFiles, setSelectedFiles] = useState({
    document: null,
    image: null,
  });

  const handlePersonClick = (user, area) => {
    setSelectedUser({ user: user, area: area });
    setTextValue("");
    setIsUserModalVisible(true); // Open the modal
  };

  const handleCloseUserModal = () => {
    setIsUserModalVisible(false);
    setSelectedUser(null); // Clear selected user
  };

  const handleUserFormChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleSaveUser = () => {
    redirectChat(chat, {
      to: selectedUser.user._id,
      from: user._id,
      reason: textValue,
    });
    handleCloseUserModal();
  };

  useEffect(() => {
    chat;
    messages;
    chats;
  }, [chat, messages, chats]);

  const handleAttacGroupClick = () => {
    getGroups();
    setIsFileInputVisible(false);
    setIsGroupsInputVisible(!isGroupsInputVisible);
  };

  const handleAttachFileClick = () => {
    setIsGroupsInputVisible(false);
    setIsSearchInputVisible(false);
    setIsFileInputVisible(!isFileInputVisible);
  };

  const sendMessage = () => {

  }

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      /* 
          setSelectedFiles((prevFiles) => ({
            ...prevFiles,
            [type]: file.name,
          }));
        */
    }
  };

  const handleMessageUpload = (event) => {
    setMessageSend((prev) => {
      const currentMessage = event.target.value;

      if (currentMessage.length > 0) {
        setSendMessageState(true);
      } else {
        setSendMessageState(false);
      }

      return currentMessage; // Retorna el nuevo valor para setMessageSend
    });
  };

  const handleAttachSearchClick = () => {
    setIsGroupsInputVisible(false);
    setIsFileInputVisible(false);
    setIsSearchInputVisible(!isSearchInputVisible);
    console.log(isSearchInputVisible);
  };
  return (
    <>
      {chat ? (
        <div className="col d-flex flex-column">
          <div className="bg-white p-3 border-bottom d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-secondary me-2"
                style={{ width: 40, height: 40 }}
              ></div>
              <strong>
                {chat.client.number} - {chat.client.name}
              </strong>
            </div>
            <div className="buttons d-flex align-items-center">
              <PrimaryButtonOutline
                icon="Search"
                onClick={handleAttachSearchClick}
                size={"1.7em"}
              />
              {isSearchInputVisible && (
                <div
                  className="position-absolute bg-white p-2 rounded shadow m-2"
                  style={{
                    top: "4.5em",
                    transform: "translateX(-80%)",
                    minWidth: "25%",
                  }}
                >
                  <div className="input-group bg-light mt-3 p-2 rounded bg-white d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control bg-transparent border-0"
                      placeholder="Search"
                    />
                    <button className="primary-button-outline mx-2">
                      <span
                        className="material-symbols-rounded"
                        style={{ color: "#ff9900" }}
                      >
                        keyboard_arrow_up
                      </span>
                    </button>
                    <button className="primary-button-outline mx-2">
                      <span
                        className="material-symbols-rounded"
                        style={{ color: "#ff9900" }}
                      >
                        keyboard_arrow_down
                      </span>
                    </button>
                    <button className="primary-button-outline mx-2">
                      <span
                        className="material-symbols-rounded"
                        style={{ color: "#ff9900" }}
                      >
                        calendar_month
                      </span>
                    </button>
                    <span>|</span>
                    <button className="primary-button-outline mx-2">
                      <span
                        className="material-symbols-rounded"
                        style={{ color: "#ff9900" }}
                      >
                        close
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex-grow-1 p-3 overflow-auto">
            {/* Messages */}
            <div className="d-flex flex-column">
              {/* Messages */}
              <div className="d-flex flex-column">
                {messages.length > 0 ? (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded mb-2 ${
                        message.fromType != "clients"
                          ? "align-self-end bg-warning text-white p-3 rounded mb-2"
                          : "align-self-start bg-light p-3 rounded mb-2"
                      }`}
                      style={{ maxWidth: "60%" }}
                    >
                      <p className="mb-1">{message.message}</p>
                      <small
                        className={
                          message.fromType != "clients"
                            ? "text-white "
                            : "text-muted "
                        }
                      >
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </small>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No hay mensajes</p>
                )}
              </div>
            </div>
          </div>
          {/* Input Section */}
          <div className="p-3 border-top d-flex">
            <PrimaryButtonOutline
              icon="chat_paste_go"
              onClick={handleAttacGroupClick}
              size={"2em"}
            />
            <PrimaryButtonOutline
              icon="attach_file"
              onClick={handleAttachFileClick}
              size={"2em"}
            />
            {/* Ventana para adjuntar archivos (condicional) */}
            {isGroupsInputVisible && (
              <div
                className="position-absolute bg-white p-2 rounded shadow m-2"
                style={{
                  top: "67%",
                  left: "43%",
                  transform: "translateX(-100%)",
                }}
              >
                <div
                  className="list-group"
                  style={{ maxHeight: "200px", overflowY: "scroll" }}
                >
                  {groups.length > 0 &&
                    groups.map((group, index) => (
                      <div key={index}>
                        <h5 className="m-3">{group.descripcion}</h5>
                        {/* Muestra la descripción del grupo */}
                        {group.users.length > 0 ? (
                          group.users.map((user) => (
                            <div
                              key={user._id}
                              className="my-1 list-group-item list-group-item-action"
                              style={{
                                cursor: "pointer",
                                border: "none",
                              }}
                              onClick={() =>
                                handlePersonClick(user, group.descripcion)
                              }
                            >
                              {user.name}
                            </div>
                          ))
                        ) : (
                          <p className="text-muted">
                            No hay usuarios en este grupo
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
            {isFileInputVisible && (
              <div
                className="position-absolute bg-white p-2 rounded shadow m-2"
                style={{
                  top: "76%",
                  left: "48%",
                  transform: "translateX(-100%)",
                }}
              >
                {/* Opción para documentos */}
                <div
                  className="my-2 d-flex align-items-center p-2 rounded cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    document.getElementById("fileInputDoc").click()
                  }
                >
                  <span
                    className="material-symbols-rounded"
                    style={{ fontSize: "2em", color: "#7f66ff" }}
                  >
                    description
                  </span>
                  <span className="mx-1">Document</span>
                </div>
                <input
                  type="file"
                  id="fileInputDoc"
                  accept=".pdf,.doc,.docx,.txt"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e, "document")}
                />

                {/* Opción para imágenes */}
                <div
                  className="my-2 d-flex align-items-center p-2 rounded cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    document.getElementById("fileInputImage").click()
                  }
                >
                  <span
                    className="material-symbols-rounded"
                    style={{ fontSize: "2em", color: "#007BFC" }}
                  >
                    image
                  </span>
                  <span className="mx-1">Image</span>
                </div>
                <input
                  type="file"
                  id="fileInputImage"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(e, "image")}
                />
              </div>
            )}
            <input
              type="text"
              className="form-control mx-2"
              placeholder="Write a message"
              value={messageSend} // El valor del input es controlado por el estado
              onChange={handleMessageUpload} // Capturamos el valor con cada tecla presionada
            />
            <PrimaryButton
              icon={"send"}
              onClick={sendMessage}
              size={"2em"}
            />
          </div>
        </div>
      ) : (
        <div className="col align-self-center text-center">
          <div className="">
            <img src={Logo} alt="Chatgo Logo" className="w-64 h-64 mb-6" />
            <h1 className="text-2xl font-bold mb-2">
              ¡Bienvenido {user.name}!
            </h1>
            <p className="text-gray-400 max-w-md mb-4">
              Esta es una interfas para la atencion al cliente, para empezar a
              hablar da clic en algun cliente.
            </p>
            <a
              href="https://www.microsoft.com/store/apps/9NKSQGP7F2NH"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-600 transition"
            >
              Descargar de Microsoft Store
            </a>
            <p className="text-gray-500 text-sm absolute bottom-4">
              {" "}
              {/* Posición fija abajo */}© {new Date().getFullYear()} Inttelgo
              SAS
            </p>
          </div>
        </div>
      )}
      {/**User Modal */}
      <UserModal
        isVisible={isUserModalVisible}
        onClose={handleCloseUserModal}
        user2={selectedUser} // Pass the selected user to the modal
        textValue={textValue}
        handleChange={handleUserFormChange}
        handleSave={handleSaveUser}
      />
    </>
  );
}

export default Conversation;
