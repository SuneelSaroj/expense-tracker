import React, { useEffect, useState } from 'react'
import { Modal, Button, Grid, Stack, TableContainer, Box, TableHead, TableRow, TableCell, Table, TableBody } from "@mui/material";
import Container from "../UI/Container";
import ClearIcon from "@mui/icons-material/Clear";
import { usePopUpContext } from "../../Context/PopupMessage";
import axios from "../../api";

const InfoModal = (props) => {
    const { setPopupMessage, setLoading } = usePopUpContext();
    const [infoVal, setInfoVal] = useState([]);
    useEffect(() => {
        if (props.open === true) {
            handleGo();
        }
    }, [props.open])
    const handleGo = () => {
        // e?.preventDefault();
        let params = ({ status_id: props.status_id });
        setLoading(true);
        let url = "/status/getStatusInfo";
        axios.post(url, params)
            .then(res => {
                setLoading(false)
                if (res.data.success) {
                    var arrResponse = res.data.data[0]
                    //setValue(arrResponse)
                    setInfoVal(arrResponse);
                } else {
                    setPopupMessage({ state: true, type: "error", message: res.data.message })
                }
            }
            ).catch(e => {
                console.log(e)
                setLoading(false)
                setPopupMessage({ state: true, type: "error", message: e.response?.data?.message })
            }
            )
    }
    const handleClose = () => {
        props.onClose();
    }

    return (
        <Modal open={props.open} >
            <Container
                className="ixPopupLayout"
                position="absolute"
                top="30%"
                left="30%"
                spacing={1}
                sx={{
                    overFlow: "auto", display: "flex",
                    flex: 1, flexDirection: "column", justifyContent: "space-between",
                    height: "auto", width: "550px", maxWidth: "25%"
                }} >
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="ixPopupHeader"  >
                    <Box className="ixPopupHeaderTitle">Status Information</Box>
                    <Button onClick={handleClose} styletype="icon" className="ixButtonPopupHeader" > <ClearIcon /> </Button>
                </Stack>
                <Container className="ixPopupContainer" >
                    <Stack direction="column" sx={{ background: "#FFFFFF", borderRadius: "2px", borderStyle: "none", height: "auto", padding: "20px" }}>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                            <Grid item xs={2.5} textAlign="right" sx={{ padding: "5px", color: "#919090" }} >
                                Task ID
                            </Grid>
                            <Grid item xs={9.5} sx={{ padding: "5px" }} >
                                {infoVal.task_id}
                            </Grid>
                            <Grid item xs={2.5} textAlign="right" sx={{ padding: "5px", color: "#919090" }}>
                                Task Type
                            </Grid>
                            <Grid item xs={9.5} sx={{ padding: "5px" }}>
                                {infoVal.task_type}
                            </Grid>
                            <Grid item xs={2.5} textAlign="right" sx={{ padding: "5px", color: "#919090" }} >
                                Task Status
                            </Grid>
                            <Grid item xs={9.5} sx={{ padding: "5px" }}>
                                {infoVal.task_status}
                            </Grid>
                            <Grid item xs={2.5} textAlign="right" sx={{ padding: "5px", color: "#919090" }}>
                                Date/Time
                            </Grid>
                            <Grid item xs={9.5} sx={{ padding: "5px" }}>
                                {infoVal.task_status_dttms}
                            </Grid>
                            <Grid item xs={2.5} textAlign="right" sx={{ padding: "5px", color: "#919090" }}>
                                Description
                            </Grid>
                            <Grid item xs={9.5} sx={{ padding: "5px" }}>
                                {infoVal.description}
                            </Grid>
                        </Grid>

                        <TableContainer>
                            <Table >
                                <TableHead>
                                    <TableRow className="infoRow">
                                        <TableCell sx={{ border: 'none' }}></TableCell>
                                        <TableCell align="center" sx={{ color: "#919090", padding: "3px 10px" }}>Status</TableCell>
                                        <TableCell align="center" sx={{ color: "#919090", padding: "3px 10px" }}>Date / Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className="infoRow" sx={{ '&:-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="right" sx={{ border: 'none', color: "#919090", padding: "5px 10px" }}>Init</TableCell>
                                        <TableCell align="left" sx={{ border: '1px solid lightGrey', padding: "5px 10px" }}>{infoVal.init_status}</TableCell>
                                        <TableCell align="left" sx={{ border: '1px solid lightGrey', padding: "5px 10px" }}>{infoVal.init_status_dttms}</TableCell>
                                    </TableRow>
                                    <TableRow className="infoRow" sx={{ '&:-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="right" sx={{ border: 'none', color: "#919090", padding: "5px 10px" }}>Backup</TableCell>
                                        <TableCell align="left" sx={{ border: '1px solid lightGrey', padding: "5px 10px" }}>{infoVal.backup_status}</TableCell>
                                        <TableCell align="left" sx={{ border: '1px solid lightGrey', padding: "5px 10px" }}>{infoVal.backup_status_dttms}</TableCell>
                                    </TableRow>
                                    <TableRow className="infoRow" sx={{ '&:-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="right" sx={{ border: 'none', color: "#919090", padding: "5px 10px" }}>Transfer</TableCell>
                                        <TableCell align="left" sx={{ border: '1px solid lightGrey', padding: "5px 10px" }}>{infoVal.transfer_status}</TableCell>
                                        <TableCell align="left" sx={{ border: '1px solid lightGrey', padding: "5px 10px" }}>{infoVal.transfer_status_dttms}</TableCell>
                                    </TableRow>
                                    <TableRow className="infoRow" sx={{ '&:-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="right" sx={{ border: 'none', color: "#919090", padding: "5px 10px" }}>Wal</TableCell>
                                        <TableCell align="left" sx={{ border: '1px solid lightGrey', padding: "5px 10px" }}>{infoVal.wal_status}</TableCell>
                                        <TableCell align="left" sx={{ border: '1px solid lightGrey', padding: "5px 10px" }}>{infoVal.wal_status_dttms}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Container>
            </Container>
        </Modal >
    )
}

export default InfoModal