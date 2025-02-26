// ChatContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { roleRequest} from "../api/roles.js";
import { useCookies } from "react-cookie";
const RoleContext = createContext();

const useRoles = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useAuth must be used within an RolesProvider");

  return context;
};

const RolesProvider = ({ children }) => {
  const [cookies] = useCookies(["token"]);
  const [roles, setRoles] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [errors, setErrors] = useState([]);

  const getRoles = async () => {
    try {
      const res = await roleRequest(cookies); // Espera la respuesta
      setRoles(res.data); // Actualiza el estado con la data
      setErrors(null); // Limpia los errores si la petición es exitosa
    } catch (error) {
      setErrors(error.response?.data || "An error occurred"); // Guarda el error o un mensaje genérico
      setRoles(null); // Limpia los roles en caso de error
    }
  };

  useEffect(() => {
    if (cookies.token) { // Llama a getRoles solo si hay un token
      getRoles();
    } else {
      setRoles(null); // Limpia los roles si no hay token
    }
  }, [cookies.token]); // El efecto se ejecuta cuando cambia el token

  return (
    <RoleContext.Provider value={{ getRoles, roles, errors, setSelectedRole, selectedRole}}>
      {children}
    </RoleContext.Provider>
  );
};

export default RolesProvider;
export { RoleContext, useRoles };
