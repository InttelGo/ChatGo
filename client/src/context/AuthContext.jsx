// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, verifyToken } from "../api/auth.js";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      console.log(res.data);
      setIsAuthenticated(true);
      setCookie("token", res.data.token, { path: "/" });
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000); // Muestra el mensaje y pasados 5 segundos lo elimina
      return () => clearTimeout(timer); // Limpia el timer cuando se desmonta el componente
    }
  }, [errors]);

  useEffect(() => {
    //Manejo de cookies para el front
    async function checkLogin() {
      if (cookies.token) {
        try {
          const res = await verifyToken(cookies.token);
          if (!res.data) setErrors(false);

          setUser(res.data);
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ signin, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext, useAuth };
