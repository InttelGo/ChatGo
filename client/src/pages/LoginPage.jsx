import React, { useState } from 'react';
import Logo from "../assets/img/Logo.png";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica de envío del formulario, 
    // como enviar los datos a un servidor o mostrar mensajes de error
    console.log('User name:', username);
    console.log('Password:', password);
  };

  return (

    <div className="container-md">
      <div className="container login mt-3">
      <div className="title mt-3 mb-3">
        <h2>¡Bienvenido!</h2>
        <img src={Logo} alt="Logo" width="250px" />
      </div>
        <h4>Iniciar sesión</h4>
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