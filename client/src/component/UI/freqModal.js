import React, { useEffect, useState } from 'react'
import Container from "../UI/Container";
import { Modal, Button, Grid, Stack, TextField, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from '@mui/icons-material/Done';
import Checkbox from '@mui/material/Checkbox';
import WeekdayButton from './weekdayButton';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
const FreqModal = (props) => {

    useEffect(() => {
        setValue(props.frequency_type)
        if (props?.frequency_type === 'Daily') {
            setSelectedDays(props.frequency.split(", "));
        } else if (props?.frequency_type === 'Monthly') {
            setSelectedDate(props.frequency);
        } else {
            setSelectedDate('');
            setSelectedDays([]);
        }
        //set value
        //according to type selectedDate/selectedDays
    }, [props.open]);
    const handleClose = () => {
        props.onClose();
        setSelectedDate('');
        setSelectedDays([]);
    }
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const handleDayClick = (day, selected) => {

        setValue("Daily");
        setSelectedDate('');
        let selectedDayVal;
        if (selected) {
            selectedDayVal = selectedDays;
            selectedDayVal.push(day);
            setSelectedDays(selectedDayVal);
        } else {
            selectedDayVal = selectedDays.filter((d) => d !== day);
            setSelectedDays(selectedDayVal);
        }
    };
    const [value, setValue] = React.useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
        if (event.target.value !== 'Daily') {
            setSelectedDays([]);
        }
        if (event.target.value !== 'Monthly') {
            setSelectedDate('');
        }
    };
    const handleSave = () => {
        if (value === "Daily") {
            const freqVal = selectedDays.join(', ');
            props.callback(value, freqVal);
        }
        else if (value === "Monthly")
            props.callback(value, selectedDate);
        else
            props.callback(value, "");
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
                    height: "auto", width: "auto",
                }} >
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} className="ixPopupHeader"  >
                    <Box className="ixPopupHeaderTitle">Set Frequency</Box>
                    <Button onClick={handleClose} styletype="icon" className="ixButtonPopupHeader" > <ClearIcon /> </Button>
                </Stack>
                <Container className="ixPopupContainer" >
                    <RadioGroup value={value} onChange={handleChange} >
                        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={1}
                            sx={{ background: "#FFFFFF", borderRadius: "5px", borderStyle: "none", margin: "5px", height: "120px", padding: "20px" }} >
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" >
                                <Grid item xs={2.5} >
                                    <FormControlLabel value="Daily" control={<Radio />} label="Daily" />
                                </Grid>
                                <Grid item xs={9.5}>
                                    Repeat every week
                                </Grid>
                                <Grid item xs={0.5} ></Grid>
                                <Grid>
                                    {weekdays.map((day) => (
                                        <WeekdayButton key={day} day={day} onClick={handleDayClick} selected={selectedDays.includes(day)} />
                                    ))}
                                </Grid>
                            </Grid>

                            {/* <Stack direction="row" sx={{ padding: "5px" }}>Selected days: {selectedDays.join(", ")}</Stack> */}

                        </Stack>
                        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={1}
                            sx={{ background: "#FFFFFF", borderRadius: "5px", borderStyle: "none", margin: "5px", height: "120px", padding: "20px" }} >
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" >
                                <Grid item xs={2.5} >
                                    <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
                                </Grid>
                                <Grid item xs={9.5}>
                                    Repeat every month
                                </Grid>
                                <Grid item xs={0.5} ></Grid>
                                <Grid item xs={2}>On Day</Grid>
                                <Grid item ><TextField sx={{ width: "90px" }}
                                    value={selectedDate ? selectedDate : ""}
                                    onChange={(e) => {
                                        setValue("Monthly");
                                        setSelectedDays([]);
                                        setSelectedDate(e.target.value);
                                    }} />
                                </Grid>
                            </Grid>
                        </Stack>
                        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={1}
                            sx={{ background: "#FFFFFF", borderRadius: "5px", borderStyle: "none", margin: "5px", height: "auto", padding: "20px" }} >
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" >
                                <Grid item xs={2.5} >
                                    <FormControlLabel value="Immediate" control={<Radio />} label="Immediate" />
                                </Grid>
                                <Grid item xs={9.5}>Trigger Based </Grid>
                            </Grid>
                        </Stack>
                    </RadioGroup>
                </Container>
                <Stack sx={{ padding: "10px" }} direction="row" justifyContent="end" spacing={1} className="ixPopupFooter">
                    <Button styletype="icon" disabled={value === "Daily" && selectedDays.length === 0 || value === "Monthly" && selectedDate === ""} onClick={handleSave}><DoneIcon /></Button>
                </Stack>
            </Container>
        </Modal >
    )
}

export default FreqModal