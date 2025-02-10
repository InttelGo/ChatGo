import React, { useRef, useState, useEffect } from "react";
import { useChats } from "../context/ChatsContext";
import { useAuth } from "../context/AuthContext";
import { useUsers } from "../context/UsersContext";
import { PrimaryButtonOutline, PrimaryButton } from "./Buttons";
import MessageList from "./MessageList";
import UserModal from "./UserModal";
import Logo from "../assets/img/Logo.png";

function Conversation() {

  //Variables globales para acceder a la informacion de forma dinamica
  const { chat, messages, redirectChat, sendMessageUser } = useChats(); //Chat con los mensajes
  const { user } = useAuth(); //Usuario autenticado
  const { groups, getGroups } = useUsers(); //grupo de usuarios para el redireccionamiento

  //Banderas para mostrar componentes
  const [isGroupsInputVisible, setIsGroupsInputVisible] = useState(false);
  const [isFileInputVisible, setIsFileInputVisible] = useState(false);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  //Texto que va a enviar el usuario al numero de whatsapp
  const [messageSend, setMessageSend] = useState(""); 

  //Seleccionador del usuario para el redireccionamiento
  const [selectedUser, setSelectedUser] = useState(null);

  //Mensaje para la justificacion del redireccionamiento
  const [textValue, setTextValue] = useState("");

  //Archivos para la subida.
  const [selectedFiles, setSelectedFiles] = useState({
    document: null,
    image: null,
  });

  //Referencias al contenido del scroll para cuando llegue un mensaje se dirija hasta el final de la conversacion.
  const messagesEndRef = useRef(null);

  //funcion para recorrer la conversacion hasta el final de la conversacion
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); //Cuando cambie el calor de los mensajes entonces me dirijo al final
  }, [messages]);


  //evento para la seleccion del usuario al cual se le realizara el redireccionamiento
  const handlePersonClick = (user, area) => {
    setSelectedUser({ user: user, area: area }); //Se almacena el usuario que se selecciono
    setTextValue(""); //formateo el valor de la justificación del redireccionamiento
    setIsGroupsInputVisible(false);
    setIsUserModalVisible(true);  //Hace visible el modal
  };

  //Evento para cerrar el modal que se abrio en la funcion anterior
  const handleCloseUserModal = () => {
    setIsUserModalVisible(false);
    setSelectedUser(null); // Libera memoria del usuario seleccionado 
    setTextValue(""); // Libera memoria del texto de la justificación del redireccionamiento
  };

  //Evento para cuando el usuario esta llenando la justificacion del redireccionamiento
  const handleUserFormChange = (e) => {
    setTextValue(e.target.value);
  };

  //Evento para enviar el mensaje cuando se presiona el boton de enviar
  const handleSaveUser = () => {
    redirectChat(chat, {// Se invoca a la funcion RedirectChat de ChatContext para el redireccionamiento de la conversacion por parte del servidor
      to: selectedUser.user._id, //Emisor
      from: user._id, //Recetor
      reason: textValue, //Justificacion
    });
    handleCloseUserModal(); //Cierro el modal que se habia ejecutado previamente
  };

  //Funcion para la visualizacion de de los usuarios agrupados por rol
  const handleAttacGroupClick = () => {
    getGroups(); //Entrega los grupos
    setIsFileInputVisible(false);
    setIsGroupsInputVisible(!isGroupsInputVisible);
  };

  //Evento onClick para el despligue del contenedor para subir archivos
  const handleAttachFileClick = () => {
    setIsGroupsInputVisible(false);
    setIsSearchInputVisible(false);
    setIsFileInputVisible(!isFileInputVisible);
  };

  //Funcion para la subida de archivos
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0]; //Alamacena el archivo seleccionado
    if (file) {
      setSelectedFiles((prevFiles) => ({
        ...prevFiles, //Agrego a archivos que previamente ya habia podido haber seleccionado
        [type]: file.name,
      }));
    }
  };
  //Evento Click que almacena el valor del mensaje a enviar
  const handleMessageUpload = (event) => {
    setMessageSend(event.target.value);
  };

  //Evento Send para enviar el mensaje que dijito el usuario
  const sendMessage = async () => {
    if (messageSend.trim() !== "") { //Se verifica que tenga campos para enviar
      sendMessageUser(chat, messageSend);
      setMessageSend(""); // Limpiar el campo después de enviar el mensaje
    }
  };

  //Evento Click para desplegar el buscardor dentro de los mensajes
  const handleAttachSearchClick = () => {
    setIsGroupsInputVisible(false);
    setIsFileInputVisible(false);
    setIsSearchInputVisible(!isSearchInputVisible);
  };
  return (
    <>
    {/* Se verifica que se haya seleccionado un chat */}
      {chat != null ? (
        <div className="col d-flex flex-column">
          <div className="bg-white p-3 border-bottom d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-secondary me-2"
                style={{ width: 40, height: 40 }}
              ></div>
              <strong> {/* Numero telefonico y nombre que tiene el cliente en whatsapp */}
                {chat.client.number} - {chat.client.name}
              </strong>
            </div>
            <div className="buttons d-flex align-items-center">
              {/* Boton de buscqueda */}
              <PrimaryButtonOutline
                icon="Search"
                onClick={handleAttachSearchClick}
                size={"1.7em"}
              />
              {/* Modulo desplegable para buscar mensajes especificos en la conversacion */}
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
                    {/* Input para la almacenar la infomacion a buuscar */}
                    <input
                      type="text"
                      className="form-control bg-transparent border-0"
                      placeholder="Search"
                    />
                    {/* Boton para buscar arriba */}
                    <button className="primary-button-outline mx-2">
                      <span
                        className="material-symbols-rounded"
                        style={{ color: "#ff9900" }}
                      >
                        keyboard_arrow_up
                      </span>
                    </button>
                    {/* Boton para buscar abajo */}
                    <button className="primary-button-outline mx-2">
                      <span
                        className="material-symbols-rounded"
                        style={{ color: "#ff9900" }}
                      >
                        keyboard_arrow_down
                      </span>
                    </button>
                    {/* Boton para buscar por dd-mm-yyyy*/}
                    <button className="primary-button-outline mx-2">
                      <span
                        className="material-symbols-rounded"
                        style={{ color: "#ff9900" }}
                      >
                        calendar_month
                      </span>
                    </button>
                    <span>|</span>
                    {/* Boton para verrar el desplegable */}
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
          {/* Lista de mensajes en la conversacion para crear una facil lectura del codio */}
          <MessageList messages={messages} messagesEndRef={messagesEndRef} />

          {/* Seccion Baja para el formulario */}
          <div className="p-3 border-top d-flex">
            {/* Boton para el redireccionamiento */}
            <PrimaryButtonOutline
              icon="chat_paste_go"
              onClick={handleAttacGroupClick}
              size={"2em"}
            />
            {/* Boton para desplegar el modulo de los archivos */}
            <PrimaryButtonOutline
              icon="attach_file"
              onClick={handleAttachFileClick}
              size={"2em"}
            />
            {/* Modulo de redireccion en la converacion */}
            {isGroupsInputVisible && (
              <div
                className="position-fixed bg-white p-3 rounded shadow"
                style={{
                  top: "41vh",
                  right: "52vw",
                  maxHeight: "40vh",
                  overflowY: "auto",
                  zIndex: 1000,
                }}
              >
                <h5 className="mb-3">Grupos</h5>
                <div className="list-group">
                  {groups.length > 0 ? (
                    groups.map((group, index) => (
                      <div key={index}>
                        {/* Titulo del conjunto de roles como administracion o ventas */}
                        <h6 className="m-2">{group.descripcion}</h6>
                        {group.users.length > 0 ? (
                          //Listado de usuarios
                          group.users.map((user) => (
                            <div
                              key={user._id}
                              className="list-group-item list-group-item-action"
                              style={{ cursor: "pointer", border: "none" }}
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
                    ))
                  ) : (
                    <p className="text-muted">No hay grupos disponibles</p>
                  )}
                </div>
              </div>
            )}
            {/*ventana para Subir Archivos */}
            {isFileInputVisible && (
              <div
                className="position-absolute bg-white p-2 rounded shadow"
                style={{
                  top: "55vh",
                  right: "40vw",
                  maxHeight: "40vh",
                  overflowY: "auto",
                  zIndex: 1000,
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && messageSend.trim() !== "") {
                  sendMessage();
                }
              }}
            />
            <PrimaryButton icon={"send"} onClick={sendMessage} size={"2em"} />
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
