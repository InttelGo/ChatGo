import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRoles } from "../context/ChatContext";

const ScrollableButtons = () => {
  const scrollContainerRef = useRef(null);
  const { getRoles, roles } = useRoles();
  const [activeButton, setActiveButton] = useState(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  useEffect(() => {
    getRoles();
  }, []);

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
    console.log("Botón seleccionado:", id);
  };

  return (
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
        roles.map((role) => (
          <button
            key={role.id}
            id={role.id}
            className={`btn ${activeButton === role.id ? "btn-warning" : "btn-light"}`}
            style={{ borderRadius: "10em" }}
            onClick={() => handleClick(role.id)}
          >
            {role.name}
          </button>
        ))
      ) : (
        <p>Cargando roles...</p>
      )}
    </div>
  );
};

export default ScrollableButtons;