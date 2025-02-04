// ChatContext.jsx
import React, { createContext, useState, useContext } from "react";
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
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState([]);

  const getRoles = async () => {
    try {
      const res = await roleRequest(cookies);
      setRoles(res.data);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  };

  return (
    <RoleContext.Provider value={{ getRoles, roles, errors }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RolesProvider;
export { RoleContext, useRoles };
