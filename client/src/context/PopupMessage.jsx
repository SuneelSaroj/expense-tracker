import { createContext, useContext, useState } from "react";

// Create context
const PopupContext = createContext();

export function usePopUpContext() {
  return useContext(PopupContext);
}

// eslint-disable-next-line react/prop-types
export function PopupContextProvider({ children }) {
  const [popupMessage, setPopupMessage] = useState({
    state: false,
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const value = { popupMessage, setPopupMessage, loading, setLoading };

  return (
    <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
  );
}
