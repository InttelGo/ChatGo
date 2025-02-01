import React from "react";
import { PrimaryButtonOutline } from "../../components/Buttons";
import Chat from "../Chat";

const HomePage = () => {
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
            <PrimaryButtonOutline icon="forum" size={"2em"} />
            <PrimaryButtonOutline icon="account_circle" size={"2.5em"} />
          </div>

          {/* Contenido Principal */}
          <div className="flex-grow-1 d-flex">
            <Chat/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
