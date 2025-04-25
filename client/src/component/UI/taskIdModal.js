import React from 'react'
import { Box, Button, Modal, Stack } from '@mui/material'
import Container from "../UI/Container";
import Typography from '@mui/material/Typography';
import { fontWeight } from '@mui/system';

const TaskIdModal = (props) => {
    const handleClose = () => {
        props.onClose();
    }
    return (
        <Modal open={props.open} >
            <Container
                className="ixPopupLayout"
                position="absolute"
                top="30%"
                left="40%"
                spacing={1}
                sx={{
                    overFlow: "auto", display: "flex",
                    flex: 1, flexDirection: "column", justifyContent: "space-between", wordSpacing: "5px",
                    height: "auto", maxWidth: "25%", border: "2px solid #FF6600", font: "18px Helvetica,  Sans-serif", lineHeight: " 1.5"
                }} >

                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="ixPopupHeader" sx={{ backgroundColor: "#FF6600" }}  >
                    <Box className="ixPopupHeaderTitle" sx={{ color: "white", fontWeight: "bold" }}>{props?.type === 'save' ? "Task ID" : "Delete Task"}</Box>
                </Stack>
                {props?.type === 'save' ?
                    <Container className="ixPopupContainer" sx={{ overflow: "auto", padding: "30px", justifyContent: "center", alignItems: "center" }}>
                        Task ID  <b style={{ fontSize: "28px", fontWeight: "900" }}>{props.taskIdVal}</b> has been created. Please use this Task Id when configuring the InBack agent on the ON-Demand Server.
                    </Container> :
                    <Container className="ixPopupContainer" sx={{ overflow: "auto", padding: "30px", justifyContent: "center", alignItems: "center" }}>
                        Task ID  <b style={{ fontSize: "28px", fontWeight: "900" }}>{props.taskIdVal}</b> <br /> Are you sure to delete this task?
                    </Container>}

                <Stack sx={{ padding: "10px" }} direction="row" justifyContent="end" spacing={1} className="ixPopupFooter">
                    {props?.type === 'save' ? <Button styletype="lightGrey" onClick={handleClose}>OK</Button> : <>
                        <Button styletype="lightGrey" onClick={props.handleProceed}>Yes</Button>
                        <Button styletype="lightGrey" onClick={handleClose}>No</Button></>}
                </Stack>
            </Container>
        </Modal >
    )
}

export default TaskIdModal