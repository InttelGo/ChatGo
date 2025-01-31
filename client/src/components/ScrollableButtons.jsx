import React, { useRef } from "react";

const ScrollableButtons = () => {
  const scrollContainerRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

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
    const walk = (x - startX) * 2; // Multiplica para más velocidad
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
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
      <button className="btn btn-warning" style={{ borderRadius: "10em" }}>Todos</button>
      <button className="btn btn-light" style={{ borderRadius: "10em" }}>No leidos</button>
      <button className="btn btn-light" style={{ borderRadius: "10em" }}>Administrativo</button>
      <button className="btn btn-light" style={{ borderRadius: "10em" }}>Ventas</button>
    </div>
  );
};

export default ScrollableButtons;
