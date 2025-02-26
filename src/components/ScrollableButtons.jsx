import React, { useRef, useState, useEffect } from "react";
import { useRoles } from "../context/RoleContext";
import { useChats } from "../context/ChatsContext";

const ScrollableButtons = () => {
  const scrollContainerRef = useRef(null);
  const { getRoles, roles, setSelectedRole } = useRoles();
  const { getChats, chatsStatus } = useChats();
  const [activeButton, setActiveButton] = useState(null);
  const [isSeeGroup, setIsSeeGroup] = useState(0);
  let isDown = false;
  let startX;
  let scrollLeft;

  useEffect(() => {
    getRoles();
  }, []); // Agregar getRoles como dependencia

  useEffect(() => {
    if (roles != null && !activeButton) {
      setActiveButton(roles.areas[0].role._id);
      setSelectedRole(roles.areas[0]._id);
      getChats(roles.areas[0]._id, isSeeGroup);
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
      { roles != null ?(
        <div className="container">
          <div
            ref={scrollContainerRef}
            className="scroll-container d-flex overflow-hidden gap-2 p-2"
            style={{ whiteSpace: "nowrap", cursor: "grab", userSelect: "none" }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            { roles.areas.length > 0 ? (
              roles.areas.map(
                (
                  role // Aquí cambiamos forEach por map
                ) => (
                  <button
                    key={role.role._id}
                    id={role.role._id}
                    className={`btn ${
                      activeButton === role.role.id ? "btn-warning" : "btn-light"
                    }`}
                    style={{ borderRadius: "10em" }}
                    onClick={() => handleClick(role.role._id)}
                  >
                    {role.role.descripcion}{" "}
                    <span class="badge bg-primary rounded-pill">
                      {role.cantidad}
                    </span>
                    {/* Usamos "descripción" en lugar de "name" */}
                  </button>
                )
              )
            ) : (
              <p>Cargando roles...</p>
            )}
          </div>
          <div
            ref={scrollContainerRef}
            className="scroll-container d-flex overflow-hidden gap-2 p-2"
            style={{ whiteSpace: "nowrap", cursor: "grab", userSelect: "none" }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {roles.status.length > 0 ? (
              roles.status.map((item) => (
                <div
                  className="scroll-container d-flex overflow-hidden gap-2 p-2"
                  style={{
                    whiteSpace: "nowrap",
                    cursor: "grab",
                    userSelect: "none",
                  }}
                >
                  <button
                    className={`btn ${
                      isSeeGroup == item.number ? "btn-warning" : "btn-light"
                    }`}
                    style={{ borderRadius: "10em" }}
                    onClick={() => handleSeeGroup(item.number)}
                  >
                    {item.estado+" "}
                    <span class="badge bg-primary rounded-pill">
                      {item.cantidad}
                    </span>
                  </button>
                </div>
              ))
            ) : (
              <p>Cargando estados...</p>
            )}
          </div>
        </div>

      ):(
        <p>Cargando datos...</p>
      ) }
    </div>
  );
};

export default ScrollableButtons;
