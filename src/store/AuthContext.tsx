import React, { useEffect, useState } from "react";
import { eraseCookie, getCookie, setCookie } from "../cookie/cookieService";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (response: any) => {},
});

export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie("door_game_token");
    console.log("doorgame");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (response: any) => {
    const token = response.token;
    setCookie("door_game_token", token, 1);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    eraseCookie("door_game_token");
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
