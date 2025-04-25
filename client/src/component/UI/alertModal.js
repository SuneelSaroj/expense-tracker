import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { usePopUpContext } from "../../Context/PopupMessage";
import { Alert, Button, Modal } from "@mui/material";
import { Box, Container } from "@mui/system";

export const AlertModal = () => {
  console.log("this is a alert box");
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
    <Modal open={open}>
      <Box
        sx={{
          padding: "0px !important",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          px: 4,
          border:
            popupMessage.type === "error"
              ? "1px solid #a80019"
              : popupMessage.type === "info"
              ? "1px solid #0099ff"
              : popupMessage.type === "success"
              ? "1px solid #38761D"
              : popupMessage.type === "warning"
              ? "1px solid #FF6600"
              : "none",
        }}>
        <Alert
          variant="filled"
          severity={popupMessage.type}
          sx={{ whiteSpace: "pre-line", width: "100%", borderRadius: 0 }}>
          {popupMessage.type}
        </Alert>

        <Container
          sx={{
            overflow: "auto",
            padding: "30px",
            justifyContent: "center",
            alignItems: "center",
          }}>
          {popupMessage.message}
        </Container>

        <Stack
          sx={{ padding: "10px" }}
          direction="row"
          justifyContent="end"
          spacing={1}
          className="ixPopupFooter">
          <Button styletype="lightGrey" onClick={handleClose}>
            OK
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
