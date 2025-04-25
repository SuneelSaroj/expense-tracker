import React from "react";
import {
    Modal,
    Button,
    Stack,

    Box
} from "@mui/material";

import WarningIcon from '@mui/icons-material/Warning';
import Container from "../UI/Container";
const Warning = (props) => {

    const handleClose = () => {
        props.onClose();
    }
    const handleSuccess = () => {
        props.onDelete();
    }

   
    return (
        <>

            <Modal open={true}>
                <Container
                    className="ixPopupLayout"
                    position="absolute"
                    top="33%"
                    left="35%"
                    spacing={1}
                    sx={{
                        overFlow: "auto", display: "flex",
                        flex: 1, flexDirection: "column", justifyContent: "space-between",
                        height: "200px", width: "400px",
                    }} >

                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.5} className="ixPopupHeader"  >
                        <Box className="ixPopupHeaderTitle"><WarningIcon /></Box><div>Warning</div>
                    </Stack>
                    <Container className="ixPopupContainer" sx={{ width: "100%", height: "auto" }}>
                    Do you want to delete this inback ?    
                        <br /> (This can't be undone).<br />
                    </Container>

                    <Stack sx={{ padding: "10px" }} direction="row" justifyContent="end" spacing={2} className="ixPopupFooter">
                        <Button onClick={() => handleSuccess()} > Yes</Button >
                        <Button onClick={() => handleClose(false)}  >No  </Button>
                    </Stack>
                </Container>
            </Modal>
        </>
    );
};
export default Warning;