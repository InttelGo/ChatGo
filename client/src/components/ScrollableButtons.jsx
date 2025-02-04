import React, { useRef, useState, useEffect } from "react";
import { useRoles } from "../context/RoleContext";
import { useChats } from "../context/ChatsContext";

const ScrollableButtons = () => {
  const scrollContainerRef = useRef(null);
  const { getRoles, roles } = useRoles();
  const { getChats } = useChats();
  const [activeButton, setActiveButton] = useState(null);
  const [isSeeGroup, setIsSeeGroup] = useState(0);
  let isDown = false;
  let startX;
  let scrollLeft;

  useEffect(() => {
    getRoles();
  }, []); // Agregar getRoles como dependencia

  useEffect(() => {
    if (roles.length > 0 && !activeButton) {
      setActiveButton(roles[0]._id);
      getChats(roles[0]._id, isSeeGroup);
    }
  }, [roles]);

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Ajuste de velocidad
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleClick = (id) => {
      setActiveButton(id);
      getChats(id, isSeeGroup);
  };

  const handleSeeGroup = (num) => {
    setIsSeeGroup(isSeeGroup == num ? 0 : num);
    if (activeButton) {
      getChats(activeButton, isSeeGroup == num ? 0 : num);
    }
  };

  return (
    <div className="my-3">
      <div
        ref={scrollContainerRef}
        className="scroll-container d-flex overflow-hidden gap-2 p-2"
        style={{ whiteSpace: "nowrap", cursor: "grab", userSelect: "none" }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {roles.length > 0 ? (
          roles.map(
            (
              role // Aquí cambiamos forEach por map
            ) => (
              <button
                key={role._id}
                id={role._id}
                className={`btn ${
                  activeButton === role._id ? "btn-warning" : "btn-light"
                }`}
                style={{ borderRadius: "10em" }}
                onClick={() => handleClick(role._id)}
              >
                {role.descripcion}{" "}
                {/* Usamos "descripción" en lugar de "name" */}
              </button>
            )
          )
        ) : (
          <p>Cargando roles...</p>
        )}
      </div>
      <div
        className="scroll-container d-flex overflow-hidden gap-2 p-2"
        style={{ whiteSpace: "nowrap", cursor: "grab", userSelect: "none" }}
      >
        <button
          className={`btn ${isSeeGroup == 1 ? "btn-warning" : "btn-light"}`}
          style={{ borderRadius: "10em" }}
          onClick={() => handleSeeGroup(1)}
        >
          Leidos{" "}
        </button>
        <button
          className={`btn ${isSeeGroup == 2 ? "btn-warning" : "btn-light"}`}
          style={{ borderRadius: "10em" }}
          onClick={() => handleSeeGroup(2)}
        >
          No leidos{" "}
        </button>
      </div>
    </div>
  );
};

export default ScrollableButtons;
