import React, { useRef, useState, useEffect } from "react";
import { PrimaryButtonOutline } from "../../components/Buttons";
import Chat from "../Chat";
import User from "../User";
import { useUsers } from "../../context/UsersContext";



const HomePage = () => {

  const { getGroups } = useUsers();
  const [activeButton, setActiveButton] = useState(1);

  const handleSeeUser = (num) => {
    setActiveButton(num); 
    getGroups(num);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
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
              <PrimaryButtonOutline icon="forum" size={"2em"} onClick={() => handleSeeUser(1)} />
              
              {/*<PrimaryButtonOutline icon="article_person" size={"2em"} onClick={() => handleSeeUser(2)} />*/}
            </div>
            <div>
              <PrimaryButtonOutline icon="account_circle" size={"2.5em"} onClick={() => handleSeeUser(3)} />
            </div>
          </div>
          {/* Contenido Principal */}
          <div className="flex-grow-1 d-flex">
            {activeButton === 1 && <Chat />}
            {/*activeButton === 2 && <User />*/}

          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
