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
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
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
      if (!cookies.token) {
        setIsAuthenticated(false);
          setLoading(false);
          return;
      }

      try {
        const res = await verifyToken(cookies);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
      
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ signin, user, isAuthenticated, errors, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext, useAuth };
