import React, { useState } from 'react';
import Logo from "../assets/img/Logo.png";

function LoginPage() {
  const [username, setUsername] = useState('');//Estado para el usuario
  const [password, setPassword] = useState('');//Estado de contraseña para el usuario
  const [seePassword, setSeePassword] = useState(false);
  const [error, setError] = useState(""); // Estado para los mensajes de error
  const [success, setSuccess] = useState(""); // Estado para mensajes de éxito

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reinicia el mensaje de error
    setSuccess(""); // Reinicia el mensaje de éxito

    try {
      const response = await fetch("https://meta.webmastercolombia.net:8443/api/login", { //Solicitud al servidor por metodo post
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message); // Mensaje de éxito desde el servidor
        console.log("Token:", data.token); // uso de token
        console.log("User Info:", data.user);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error desconocido"); // Mensaje de error desde el servidor
      }
    } catch (err) {
      console.error(err);
      setError("Error en la conexión con el servidor"); // Error de conexión
    }
  };



  return (

    <div className="container-md">
      <div className="container login mt-3">
      <div className="title mt-3 mb-3">
        <h2>¡Bienvenido!</h2>
        <img src={Logo} alt="Logo" width="250px" />
      </div>
        <h4>Iniciar sesión</h4>
        {/* Mostrar mensajes de error */}
        {error && <div className="alert alert-danger">{error}</div>}
        {/* Mostrar mensajes de éxito */}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="floatingInput">Nombre usuario</label>
          </div>
          <div className="form-floating mt-3">
            <input
              type={seePassword ? "text" : "password"}
              className="form-control"
              id="floatingPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">contraseña</label>
          </div>
          <div className="form-check form-switch mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="flexSwitchCheckDefault"
              checked={seePassword}
              onChange={() => setSeePassword(!seePassword)}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              Ver contraseña
            </label>
          </div>
          <div className="button-form mt-3">
            <button className="btn btn-primary" type="submit">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;