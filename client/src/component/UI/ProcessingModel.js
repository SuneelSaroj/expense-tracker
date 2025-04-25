import React from 'react'
import { Stack, Grid, Box, Button, Modal,ButtonGroup, FormControlLabel, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import serverAPI from "../../api";
import { usePopUpContext } from "../../Context/PopupMessage";
import Container from "../UI/Container";
import ClearIcon from "@mui/icons-material/Clear";


const ProcessModel = (props) => {

    let hdr = props.hdr;

    const [processModel, setProcessingModel] = React.useState({});
    const { setPopupMessage, setLoading } = usePopUpContext();

    const processModelOption = [
        { label: 'Cut From', id: 'CF' },
        { label: 'Cut To', id: 'CT' },
    ];

    const handleCloseEditModel = () => {

        props.close(false);
    };

    const handleProcessingModel = (value, target) => {

        setProcessingModel({
            ...processModel,
            [target]: value,
        });
    }

    const handleSaveProcessModel = () => {

        setLoading(true);

        let payload = {
            cmpyId: hdr.cmpyid,
            refPfx: hdr.ordpfx,
            refNo: hdr.ordno,
            prsMdl: processModel.processModel.id,
        }

        serverAPI.get('/upd/processModel', { params: payload })
            .then(response => {

                setLoading(false);
                if (response.data.success) {
                    setPopupMessage({ state: true, type: "success", message: response.data.message });
                }
                else {
                    setPopupMessage({ state: true, type: "error", message: response.data.message });
                }

                props.refresh();
                props.close(true);


            })
            .catch(error => { console.log(error); setLoading(false); });

    };

    return (
        <>
            <Modal open={props.open}>
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
                    <Box className="ixPopupHeaderTitle">Edit Processing Model</Box>
                    <Button onClick={handleCloseEditModel} styletype="icon" className="ixButtonPopupHeader" > <ClearIcon /> </Button>
                </Stack>
                <Container className="ixPopupContainer" >
                    {/* <Stack direction="column" sx={{ background: "#FFFFFF", borderRadius: "2px", borderStyle: "none", height: "auto", padding: "20px" }}> */}
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{padding:'20px'}}>

                            <Grid item xs={4} sx={{ mt: 1 }}>
                                Processing Model
                            </Grid>
                            <Grid item xs={8}>
                                <Autocomplete
                                    id="whs-standard"
                                    // size="small"
                                    // limitTags={2}
                                    sx={{background: "#FFFFFF",}}
                                    options={processModelOption}
                                    onChange={(e, newValue) => handleProcessingModel(newValue, 'processModel')}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                        />
                                    )} defaultValue={{ label: hdr?.modeldesc, id: hdr?.model }}
                                />
                            </Grid>
                        </Grid>
                    {/* </Stack> */}
                </Container>

                <Stack sx={{ padding: "10px" }} direction="row" justifyContent="end" spacing={1} className="ixPopupFooter">
                    <Button styletype="icon" onClick={handleSaveProcessModel}><SaveIcon/></Button>
                </Stack>
                </Container>
            </Modal>
        </>
    )
};

export default ProcessModel
