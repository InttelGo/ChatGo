import React, { useRef, useState, useEffect } from "react";
import { PrimaryButtonOutline, PrimaryButton } from "../../components/Buttons";
import Chat from "../Chat";
import User from "../User";
import { useUsers } from "../../context/UsersContext";
import { useChats } from "../../context/ChatsContext";
import { useAuth } from "../../context/AuthContext";
import Perfil from "../../assets/img/perfil_default.png";

const HomePage = () => {
  const { getGroups } = useUsers();
  const [activeButton, setActiveButton] = useState(1);
  const { success, setSuccess } = useChats();
  const [profileImage, setProfileImage] = useState(Perfil);
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useAuth();
  const profileRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (success.length > 0) {
      const interval = setInterval(() => {
        setSuccess((prevAlerts) => prevAlerts.slice(1)); // Elimina el primer mensaje
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [success]);

  const handleSeeUser = (num) => {
    setActiveButton(num);
    getGroups(num);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        {success.map((message, index) => (
          <div
            key={index}
            className="alert alert-success fade show"
            role="alert"
            style={{
              transition:
                "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
              opacity: 1,
              transform: "translateY(0)",
            }}
          >
            <strong>Chat {message.client} redireccionado</strong>
            <br />
            <strong>Por:</strong> {message.from}
            <br />
            <strong>Para:</strong> {message.to}
            <br />
            <strong>Motivo:</strong> {message.reason}
          </div>
        ))}
      </div>

      <div
        className="card login shadow"
        style={{ height: "90vh", width: "170vh" }} // Aumenta la altura del contenedor
      >
        <div className="d-flex" style={{ height: "100%", width: "100%" }}>
          {/* Sidebar */}
          <div
            className="col-2 d-flex flex-column justify-content-between align-items-center"
            style={{
              maxWidth: "70px", // Ajusta el tamaño de la barra lateral
              backgroundColor: "#f0f2f5",
            }}
          >
            <div>
              <PrimaryButtonOutline
                icon="forum"
                size={"2em"}
                onClick={() => handleSeeUser(1)}
              />

              {/*<PrimaryButtonOutline icon="article_person" size={"2em"} onClick={() => handleSeeUser(2)} />*/}
            </div>
            <div>
              <PrimaryButtonOutline
                icon="account_circle"
                size={"2.5em"}
                onClick={() => setShowProfile(!showProfile)}
              />
            </div>
          </div>
          {/* Contenido Principal */}
          <div className="flex-grow-1 d-flex">
            {activeButton === 1 && <Chat />}
            {/*activeButton === 2 && <User />*/}
          </div>
        </div>
      </div>
      {showProfile && (
        <div
          ref={profileRef}
          className="position-absolute bg-white p-3 rounded shadow"
          style={{
            top: "55vh",
            right: "75vw",
            width: "200px",
            zIndex: 1000,
          }}
        >
          <div className="text-center">
            <div className="text-center position-relative">
              <div
                className="position-relative"
                style={{ display: "inline-block" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <label htmlFor="fileInput">
                  <img
                    src={profileImage}
                    alt="Perfil"
                    className="rounded-circle"
                    style={{
                      width: "80px",
                      height: "80px",
                      cursor: "pointer",
                      transition: "0.3s",
                      filter: isHovered
                        ? "brightness(50%)"
                        : "brightness(100%)",
                    }}
                  />
                  {isHovered && (
                    <div
                      className="position-absolute d-flex justify-content-center align-items-center"
                      style={{
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        borderRadius: "50%",
                      }}
                    >
                      <span class="material-symbols-rounded text-white">edit</span>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <h5 className="mt-2">{user.name}</h5>
            <p className="text-muted">Disponible</p>
          </div>
          <hr />
          <div className="d-grid mx-3">
            <button className="btn btn-primary" type="submit">
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
