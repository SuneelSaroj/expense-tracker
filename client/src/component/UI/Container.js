import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { Box } from "@mui/material"


// core components

// Dark Teal      = #6D92A5
// Middle Teal = #A0BBCA
// Light Teal     = #D2E0E8


const RegularContainer = React.forwardRef((props, ref) => {
  const {
    height,
    width,
    color,
    round,
    children,
    fullWidth,
    disabled,
    display,
    block,
    padding,
    className, flex,
    fleXDirection,
    overFlow,
    justifyContent,
    border,
    margin,
    sx,
    ...rest
  } = props;
  

  const useStyles =
  {
    width: width ? width : "100%",
    height: height ? height : "100%",

    // display: display ? display : "inline-block",
    // maxWidth: "100% !important",
    // flex: flex ? flex + "!important" : "",
    // flexDirection: fleXDirection ? fleXDirection : "",
    // backgroundColor: background ? background : "transparent",
    // margin:0,

    //  maxHeight:"100%",
    // padding: padding ? padding + "!important" : "5px !important",
    // borderRadius: round ? round : "5px !important",
    // overflow: overFlow ? overFlow + "!important" : "visible",
    // justifyContent: justifyContent + "!important" ? justifyContent : "",
    // margin: margin + "!important",
    // border: border
  }


  return (
    <Box {...rest} ref={ref} className={className} sx={{ ...useStyles, ...sx }} >
      {children}
    </Box >
  );
});

RegularContainer.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
  // size: PropTypes.string,
  display: PropTypes.string,
  simple: PropTypes.bool,
  // round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  padding: PropTypes.string,

  // className: PropTypes.string
};

export default RegularContainer;
