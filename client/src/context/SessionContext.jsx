import { createContext, useContext, useState, useEffect } from "react";


export const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

// eslint-disable-next-line react/prop-types
export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    // console.log(storedUser);
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const logout = (data) => {
    if (data) {
      setIsLoggedIn(false);
      setUser(null);
      sessionStorage.removeItem("user");
    }
  };

  return (
    <SessionContext.Provider
      value={{ login, logout, isLoggedIn, user, loading }}
    >
      {children}
    </SessionContext.Provider>
  );
};
