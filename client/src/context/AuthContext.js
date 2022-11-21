import React, { useState } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  isAdmin: false,
  adminLogin: () => {},
  login: () => {},
  logout: () => {},
  username: "",
  id: ""
});

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  const loginHandler = (data) => {
    setIsAuthenticated(true);
    setUsername(data.name);
    setId(data.id)
  };

  const logoutHandler = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUsername("");
    setId("");
  }

  const adminLoginHandler = () => {
    setIsAdmin(true);
  }

  return (
    <AuthContext.Provider
      value={{ login: loginHandler, logout: logoutHandler, adminLogin: adminLoginHandler, isAuth: isAuthenticated, isAdmin: isAdmin, username: username, id: id}}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
