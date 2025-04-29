/* eslint-disable react/prop-types */
// src/components/AlertModal.jsx
import { useEffect, useState } from "react";

export const AlertModal = ({ popupMessage, resetPopupMessage }) => {
  const { message = "", type = "", state } = popupMessage;

  const [open, setOpen] = useState(popupMessage.state);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    resetPopupMessage(); // Reset popup state when manually closed
  };

  // Effect to handle the state change from props and auto-close after 1 second
  useEffect(() => {
    if (state) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        resetPopupMessage();
      }, 1000);

      // Cleanup the timeout if the component unmounts or if `state` changes
      return () => clearTimeout(timer);
    }
  }, [state, resetPopupMessage]);

  if (!message) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${open ? "block" : "hidden"}`}>
      <div
        className={`${
          type === "error"
            ? "bg-red-500"
            : type === "success"
            ? "bg-green-500"
            : type === "warning"
            ? "bg-yellow-500"
            : "bg-blue-500"
        } text-white px-4 py-3 rounded shadow-md max-w-sm w-full`}
      >
        <div className="flex justify-between items-center">
          {/* Alert message */}
          <span className="whitespace-pre-line">{message}</span>

          {/* Close button */}
          <button className="text-white ml-2" onClick={handleClose}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};
