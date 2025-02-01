import React, { useRef, useState } from "react";
import ScrollableButtons from "../components/ScrollableButtons";
import { PrimaryButtonOutline, PrimaryButton } from "../components/Buttons";

function Chat() {
  const [isGroupsInputVisible, setIsGroupsInputVisible] = useState(false);
  const [isFileInputVisible, setIsFileInputVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({
    document: null,
    image: null,
  });

  const handleAttacGroupClick = () => {
    setIsFileInputVisible(false);
    setIsGroupsInputVisible(!isGroupsInputVisible);
  };

  const people = [
    { name: "Persona 1", id: 1 },
    { name: "Persona 2", id: 2 },
    { name: "Persona 3", id: 3 },
    { name: "Persona 4", id: 4 },
    { name: "Persona 5", id: 5 },
  ];

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
    setIsModuleVisible(true);
  };

  const handleCloseModule = () => {
    setIsModuleVisible(false); // Cerrar el módulo
  };

  const handleAttachFileClick = () => {
    setIsGroupsInputVisible(false);
    setIsFileInputVisible(!isFileInputVisible);
  };

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
  return (
    <div className="d-flex h-100 w-100">
      <div className="col-4 bg-light border-end p-3">
        <div>
          <h5 className="fw-bold my-2">Type | ChatGo</h5>
          <div className="input-group bg-light mt-3 p-2 rounded bg-white d-flex align-items-center">
            <span class="material-symbols-rounded" style={{ color: "#ff9900" }}>
              search
            </span>
            <input
              type="text"
              className="form-control bg-transparent border-0"
              placeholder="Search"
              style={{ height: "100%" }}
            />
          </div>
        </div>
        <ScrollableButtons />

        {/* Contact List */}
        <div className="list-group">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="list-group-item d-flex align-items-center"
            >
              <div
                className="rounded-circle bg-secondary me-2"
                style={{ width: 40, height: 40 }}
              ></div>
              <div>
                <strong>+57 3000-000-000</strong>
                <p className="small text-muted">Mensaje previo</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Chat Section */}
      <div className="col d-flex flex-column">
        <div className="bg-white p-3 border-bottom d-flex align-items-center justify-content-between w-100">
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle bg-secondary me-2"
              style={{ width: 40, height: 40 }}
            ></div>
            <strong>+57 3000-000-000</strong>
          </div>
          <div className="buttons d-flex align-items-center">
            <PrimaryButtonOutline
              icon="Search"
              onClick={handleAttachFileClick}
              size={"1.7em"}
            />
            <PrimaryButtonOutline
              icon="more_vert"
              onClick={handleAttachFileClick}
              size={"1.7em"}
            />
          </div>
        </div>
        <div className="flex-grow-1 p-3 overflow-auto">
          {/* Messages */}
          <div className="d-flex flex-column">
            <div
              className="align-self-start bg-light p-3 rounded mb-2"
              style={{ maxWidth: "60%" }}
            >
              <p className="mb-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod...
              </p>
              <small className="text-muted">HH:MM</small>
            </div>
            <div
              className="align-self-end bg-warning p-3 rounded mb-2 text-white"
              style={{ maxWidth: "60%" }}
            >
              <p className="mb-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod...
              </p>
              <small className="text-white">HH:MM</small>
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
                <h5 className="m-3">Area 1</h5>
                {people.map((person) => (
                  <div
                    key={person.id}
                    className="my-1 list-group-item list-group-item-action"
                    style={{
                      cursor: "pointer",
                      border: "none",
                    }} // Estilo para indicar que es clickable
                    onClick={() => handlePersonClick(person)}
                  >
                    {person.name}
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
                onClick={() => document.getElementById("fileInputDoc").click()}
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
          />
          <PrimaryButton
            icon="mic"
            onClick={handleAttachFileClick}
            size={"2em"}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
