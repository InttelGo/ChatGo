// ChatContext.jsx
import React, { createContext, useState, useContext } from "react";
import { roleRequest } from "../api/roles.js";

const AuthContext = createContext();

const useRoles = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an RolesProvider");

  return context;
};

const RolesProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState([]);

  const getRoles = async (user) => {
    try {
      const res = await roleRequest(user);
      setRoles(res.data);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);   
    }
  };

  return (
    <AuthContext.Provider value={{ getRoles, roles, errors }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, useRoles, RolesProvider }; // Named exports