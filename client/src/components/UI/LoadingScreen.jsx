import { usePopUpContext } from "../../context/PopupMessage";
import Alert from "./Alert";
import { Box } from "@mui/material";

const LoadingScreen = () => {
  const { popupMessage, loading } = usePopUpContext();

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1300, // higher than drawer/modal
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <lottie-player
            src="https://lottie.host/c3669991-78a6-461d-b016-6cc178007855/kbCufr1vDo.json" // You can change to any Lottie JSON
            background="transparent"
            speed="1"
            style={{ width: "150px", height: "150px" }}
            loop
            autoplay
          ></lottie-player>
        </Box>
      )}

      {/* Show Alert if popupMessage is active */}
      {popupMessage.state && <Alert popupMessage={popupMessage} />}
    </>
  );
};

export default LoadingScreen;
