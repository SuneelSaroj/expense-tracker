import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { usePopUpContext } from "../../Context/PopupMessage";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  const { popupMessage } = usePopUpContext();
  const [open, setOpen] = React.useState(popupMessage.state);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(popupMessage.state);
  }, [popupMessage]);
  return (
    <Stack spacing={2} sx={{ width: "10%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={popupMessage.type}
          sx={{ whiteSpace: "pre-line", width: "100%" }}>
          {popupMessage.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
