/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
    Modal,
    Button, Grid, Autocomplete,
    Stack,
    TextField,
    Box,
    TextareaAutosize
} from "@mui/material";

import { usePopUpContext } from "../../Context/PopupMessage";
import axios from "../../api";
import ClearIcon from "@mui/icons-material/Clear";
import WarningIcon from '@mui/icons-material/Warning';
import Container from "../UI/Container";
const TemplateModal = (props) => {
    const { setPopupMessage, setLoading } = usePopUpContext();
    const [templateName, setTemplateName] = useState('');
    const [subject, setSubject] = useState('');
    const [bodyVal, setBodyVal] = useState("");
    const [typeVal, setTypeVal] = useState('');
    const [fieldOptions, setFieldOptions] = useState([]);

    const [warningModal, setWarningModal] = useState(false);
    useEffect(() => {

        if (props?.mode === true) {
            setLoading(true)
            let url = "/template/gettemplateById";
            var postData = { template_name: props.tempName, inback_id: props.inback_id }

            axios.post(url, postData)
                .then(data => {
                    setLoading(false)

                    if (data.data.success) {
                        var arrResponse = data.data.templateData
                        if (arrResponse.length === 0) {
                            setPopupMessage({ state: true, type: "error", message: data.data.message })
                        } else {

                            setTemplateName(arrResponse[0].template_name);
                            setSubject(arrResponse[0].subject)
                            setBodyVal(arrResponse[0].body.trim());
                        }


                        //navigate("/CreateTemplate", { state: { data: arrResponse[0], mode: true, moduleName: basic?.inback_table } })
                    }
                    else {
                        setPopupMessage({ state: true, type: "error", message: data.data.message })
                        handleClose()
                    }
                });
        }
    }, [props.mode]);

    const handleClose = () => {
        setTypeVal("");
        setTemplateName("");
        setSubject("");
        setBodyVal("");
        props.onClose();
    }
    const handleGo = () => {
        setLoading(true);
        let url;
        let params
        if (props.mode) {
            url = "template/edit_inback_template";
            params = { template_name: templateName, subject: subject, body: bodyVal, inback_id: props.inback_id, action: "save" }
        } else {
            url = "template/saveTemplate";
            params = { template_name: templateName, subject: subject, body: bodyVal }

        }

        axios.post(url, params)
            .then(data => {
                setLoading(false)

                if (data.data.success) {
                    setPopupMessage({ state: true, type: "success", message: data.data.message })
                    // getValue({ type: 'templates' }, setTemplateOptions)
                    handleClose();
                }

                else {
                    setPopupMessage({ state: true, type: "error", message: data.data.message })
                }
            }
            ).catch(e => {
                console.log(e)
                setLoading(false)
                setPopupMessage({ state: true, type: "error", message: e.response?.data?.message })
            }
            )

    }
    const handleTypeVal = (field) => {

        if (field)
            setTypeVal("$" + field)
        else {
            setTypeVal("")
        }

    }
    const handleInsert = () => {
        if (bodyVal !== "") {
            setBodyVal(bodyVal + " " + typeVal)
        } else {
            setBodyVal(typeVal)
        }
    }
    const getValue = (params, setValue) => {

        // setOpen(true)
        let url = "/getDropdown"
        axios.post(url, params /*{ type: route }*/)
            .then(res => {
                if (res.data.success) {

                    var arrResponse = res.data.data
                    setValue(arrResponse)
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
    const handleDelete = () => {
        setLoading(true);
        let url = "template/edit_inback_template";
        var params = { template_name: templateName, subject: subject, body: bodyVal, inback_id: props.inback_id, action: "delete" }

        axios.post(url, params)
            .then(data => {
                setLoading(false)

                if (data.data.success) {
                    setPopupMessage({ state: true, type: "success", message: data.data.message });
                    setWarningModal(false);
                    // getValue({ type: 'templates' }, setTemplateOptions)
                    props.onDelete();
                    setTypeVal("");
                    setTemplateName("");
                    setSubject("");
                    setBodyVal("");
                    props.onClose();
                    //setAction('')
                }

                else {
                    setPopupMessage({ state: true, type: "error", message: data.data.message })
                }
            }
            ).catch(e => {
                console.log(e)
                setLoading(false)
                setPopupMessage({ state: true, type: "error", message: e.response?.data?.message })
            }
            )

    }
    return (
        <>

            <Modal open={props.open} >
                <Container
                    className="ixPopupLayout"
                    position="absolute"
                    top="5%"
                    left="10%"
                    spacing={1}
                    sx={{
                        overFlow: "auto", display: "flex",
                        flex: 1, flexDirection: "column", justifyContent: "space-between",
                        height: "75%", width: "75%",
                    }} >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="ixPopupHeader"  >
                        <Box className="ixPopupHeaderTitle">
                            {props.mode === true ? "Edit Template" : "Create Template"}
                        </Box>
                        <Button onClick={handleClose} styletype="icon" className="ixButtonPopupHeader" > <ClearIcon /> </Button>
                    </Stack>
                    <Container className="ixPopupContainer" sx={{ overflow: "auto" }}>
                        <Grid container spacing={2} direction="row" padding="10px" justifyContent="space-between">
                            <Grid item xs={1} textAlign="right">Name</Grid>
                            <Grid item xs={11} textAlign="left" sx={{ display: "flex" }}>
                                {props.mode === true ?
                                    <><TextField disabled sx={{ width: "250px" }} value={templateName} /></> :
                                    <><TextField sx={{ width: "250px" }} value={templateName}
                                        onChange={(event) => {
                                            setTemplateName(event.target.value);
                                        }} /></>}
                            </Grid>

                            <Grid item xs={1} textAlign="right"><Box className="spacing">Subject</Box></Grid>
                            <Grid item xs={11} textAlign="left" sx={{ display: "flex" }}>
                                <TextField sx={{ width: "250px" }}
                                    value={subject}
                                    onChange={(event) => { setSubject(event.target.value); }} />
                            </Grid>

                            <Grid item xs={1} textAlign="right">Insert Variable</Grid>

                            <Grid item xs={2} sx={{ display: "flex" }}>
                                <Autocomplete sx={{ width: "250px" }}
                                    key={props?.inback_table}
                                    onOpen={() => {
                                        getValue({ type: 'field', value: props.module }, setFieldOptions)
                                    }}
                                    options={fieldOptions}
                                    isOptionEqualToValue={(option, value) => option.description === value.description}
                                    getOptionLabel={(option) => option.description}
                                    onChange={(event, newValue) => {
                                        handleTypeVal(newValue ? newValue.field_name : "");
                                    }}
                                    renderInput={(params) => <TextField {...params} />} />
                            </Grid>
                            <Grid item xs={2} sx={{ display: "flex" }}>
                                <TextField sx={{ width: "250px" }}

                                    value={typeVal}
                                //  onChange={(event) => {
                                //         setActivityIdValue(event.target.value);handleClear()}} 
                                />
                            </Grid>
                            <Grid item xs={1} sx={{ display: "flex" }}>
                                <Button onClick={() => handleInsert()}>Insert </Button>
                            </Grid>
                            <Grid item xs={6}></Grid>



                            <Grid item xs={1} sx={{ alignItems: "baseline" }} textAlign="right">Body</Grid>
                            <Grid item xs={11} textAlign="left" sx={{ display: "flex" }}>
                                <TextareaAutosize aria-label="minimum height"
                                    minRows={26}
                                    // placeholder="Enter Description"
                                    style={{ width: "100%", padding: "2px" }}
                                    value={bodyVal}
                                    onChange={(event) => {
                                        setBodyVal(event?.target.value)
                                    }} />
                            </Grid>
                        </Grid>
                    </Container>
                    <Stack sx={{ padding: "10px" }} direction="row" justifyContent="end" spacing={1} className="ixPopupFooter">
                        {props.mode === true && <Button onClick={() => setWarningModal(true)}>Remove </Button>}
                        <Button onClick={() => handleGo()} >Save </Button>
                    </Stack>

                </Container>
            </Modal>
            <Modal open={warningModal}>
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
                        Do you want to remove this template ?
                        <br /> (This can't be undone).<br />
                    </Container>

                    <Stack sx={{ padding: "10px" }} direction="row" justifyContent="end" spacing={2} className="ixPopupFooter">
                        <Button onClick={() => handleDelete()} > Yes</Button >
                        <Button onClick={() => setWarningModal(false)}  >No  </Button>
                    </Stack>
                </Container>
            </Modal>
        </>
    );
};
export default TemplateModal;