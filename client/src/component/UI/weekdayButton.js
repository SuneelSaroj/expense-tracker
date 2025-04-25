import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    minWidth: 0,
    marginRight: "10px",
    padding: 0,
    border: "1px solid lightblue",
    "&.selected": {
        background: "teal",
        color: "white",
        border: "1px solid teal"
    }
});

const WeekdayButton = ({ day, onClick, selected }) => {
    const [isSelected, setIsSelected] = useState(selected);

    useEffect(() => {
        setIsSelected(selected);
    }, [selected]);

    const handleButtonClick = () => {
        setIsSelected(!isSelected);
        onClick(day, !isSelected);
    };

    return (
        <StyledButton
            className={isSelected ? "selected" : ""}
            onClick={handleButtonClick}
        >
            {day}
        </StyledButton>
    );
};

export default WeekdayButton;
