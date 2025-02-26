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
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); // Use access_token to be consistent
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyToken(); // No es necesario pasar cookies si la API las lee
        if (res.status === 200 && res.data) {
          setUser(res.data);
          setIsAuthenticated(true);
        } else {
          removeCookie("token"); // Si el token es inválido, lo eliminamos
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        removeCookie("token");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []); // ✅ Dependencia agregada para detectar cambios en el token

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setCookie("token", res.data.token, { path: "/" }); // Set cookie
    } catch (error) {
      console.error("Login error:", error);
      setErrors(["An error occurred during login."]);
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

  return (
    <AuthContext.Provider
      value={{ signin, user, isAuthenticated, errors, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext, useAuth };
