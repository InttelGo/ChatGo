// Componente Button.jsx
import React, {useState}from "react";

export const PrimaryButtonOutline = ({ icon, onClick, size }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        onClick(); // Llama a la función onClick específica del botón
    };

    return (
        <button
            className="primary-button-outline"
            onClick={handleClick}
            style={{
                borderRadius: isClicked ? "100%" : "0%",
                boxShadow: isClicked ? "0px 0px 10px rgba(0,0,0,0.2)" : "none",
                transition: "all 0.3s ease",
                margin: "5px",
                padding: "10px"
            }}
        >
            <span
                  className="material-symbols-rounded mx-2"
                  style={{
                    fontSize: {size},
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </span>
        </button>
    );
};

export const PrimaryButton = ({ icon, onClick, size }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        onClick();
    };

    return (
        <button
            className="primary-button"
            onClick={handleClick}
            style={{
                boxShadow: isClicked ? "0px 0px 10px rgba(0,0,0,0.2)" : "none",
                transition: "all 0.3s ease",
                margin: "5px",
                padding: "10px",
                color: isClicked? "#ff9900" : "white",
                backgroundColor: isClicked? "white" : "#ff9900",
            }}
        >
            <span
                  className="material-symbols-rounded mx-2"
                  style={{
                    fontSize: {size},
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </span>
        </button>
    );
};