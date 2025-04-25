import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";
import ToggleButton from '@mui/material/ToggleButton';

// core components

// Dark Teal      = #6D92A5
// Middle Teal = #A0BBCA
// Light Teal     = #D2E0E8


const RegularToggleButton = React.forwardRef((props, ref) => {
    const {

        type,

        children,
        left,

        className,
        ...rest
    } = props;
    var background = type;
    var color='#ffffff';
    if (type === "highlight") { background = "#FFEC9B";color="#5B7A8F"}
    else if (type === "darkTeal") { background = " #5B7A8F" }
    else if (type === "mediumTeal") { background = "#A0BBCA" }
    else if (type === "grey") { background = "#EBF0F4" }  //todo
    else if (type === "warning") { background = "#ff6600" }  //todo
    else if (type === "green") { background = "#38761D" }  //todo


    const useStyles = makeStyles(theme => ({

        ToggleButton: {
            '&.MuiToggleButton-root': {
                // backgroundColor: "#D2E0E8",
                // borderRight: "2px solid #5B7A8F",
                // color: "#5B7A8F",
                margin: "0px",
                textAlign: "center",
                cursor: "pointer",
                padding: "0px",
                // borderBottomLeftRadius :"5px",
                // borderTopLeftRadius :"5px",
                minWidth: "130px",
                display: "block",
                fontWeight: "bold",
                textTransform:"capitalize",
                fontSize:" 14px",
                marginLeft: left ? "" : "2px!important",
                // '&:hover': {
                //     backgroundColor: "#D2E0E8",
                // },
            },


            '&.MuiToggleButton-root.Mui-selected': {
                 fontWeight: "bold",
                color: color,
                backgroundColor: "#5B7A8F",
                '&:hover': {
                    backgroundColor: "#5B7A8F",
                },
            }
        }
    }));
    //   const useStyles = makeStyles(theme => ({
    //     root: {

    //       // overflow: "auto"
    //     }
    //   }));
    const classes = useStyles();

    return (
        <ToggleButton {...rest} ref={ref} className={`${classes.ToggleButton} ${className ? className : ""}`}>
            {children}
        </ToggleButton>
    );
});

RegularToggleButton.propTypes = {
    color: PropTypes.string,
    left: PropTypes.bool,


    children: PropTypes.node,
    // className: PropTypes.string
};

export default RegularToggleButton;
