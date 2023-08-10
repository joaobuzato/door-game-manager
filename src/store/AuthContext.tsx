import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (response: any) => {},
});

export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (response: any) => {
    const token = response.token;
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
