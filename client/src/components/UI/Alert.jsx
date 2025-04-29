import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { usePopUpContext } from "../../context/PopupMessage";

// No typing needed in JavaScript version
const AlertComponent = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alert() {
  const { popupMessage, setPopupMessage } = usePopUpContext();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (popupMessage.state) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        setPopupMessage({ ...popupMessage, state: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage, setPopupMessage]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
    setPopupMessage({ ...popupMessage, state: false });
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <AlertComponent
        onClose={handleClose}
        severity={
          popupMessage.type === "error"
            ? "error"
            : popupMessage.type === "success"
            ? "success"
            : popupMessage.type === "warning"
            ? "warning"
            : "info"
        }
        sx={{ width: "100%" }}
      >
        {popupMessage.message}
      </AlertComponent>
    </Snackbar>
  );
}
