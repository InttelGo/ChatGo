import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/img/Logo.png";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signup, isAuthenticated, errors } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigation("/home"); // si ya esta logeado se redirecciona al home
  }, [isAuthenticated]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    signup({ username: username, password: password });
  };

  return (
    <div className="container-md d-flex justify-content-center align-items-center vh-100 ">
      <div
        className="card login p-4 shadow"
        style={{ maxWidth: "400px", width: "90%" }}
      >
        {/* Title container */}
        <div className="title-container text-center mb-4">
          <h2 className="title">¡Bienvenido!</h2>
          <img src={Logo} alt="Logo" width="200" className="img-fluid" />
          <h4 className="subtitle mt-3">Iniciar sesión</h4>
        </div>
        {/* Alerts */}
        {errors.map((error, i) => (
          <div key={i} className="alert alert-danger mx-3">{error}</div>
        ))}
        {/* Form to login */}
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3  mx-3">
            {/* username Input */}
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Nombre usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Nombre usuario</label>
          </div>
          <div className="form-floating mb-3  mx-3">
            {/* password Input */}
            <input
              type={seePassword ? "text" : "password"}
              className="form-control"
              id="floatingPassword"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Contraseña</label>
          </div>
          {/* check box to see the password */}
          <div className="form-check form-switch mb-3 mx-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="flexSwitchCheckDefault"
              checked={seePassword}
              onChange={() => setSeePassword(!seePassword)}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Ver contraseña
            </label>
          </div>
          {/* primary button login */}
          <div className="d-grid mx-3">
            <button className="btn btn-primary" type="submit">
              <h4>Iniciar sesión</h4>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
