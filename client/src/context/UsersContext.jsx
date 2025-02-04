// ChatContext.jsx
import React, { createContext, useState, useContext } from "react";
import { userRequest} from "../api/user.js";
import { useCookies } from "react-cookie";
const UserContext = createContext();

const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used within an RolesProvider");

  return context;
};

const UsersProvider = ({ children }) => {
  const [cookies] = useCookies(["token"]);
  const [groups, setGroups] = useState([]);
  const [errors, setErrors] = useState([]);

  const getGroups = async () => {
    try {
      const res = await userRequest(cookies);
      console.log(res.data); 
      setGroups(res.data);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  };

  return (
    <UserContext.Provider value={{ getGroups, groups, errors }}>
      {children}
    </UserContext.Provider>
  );
};

export default UsersProvider;
export { UserContext, useUsers };
