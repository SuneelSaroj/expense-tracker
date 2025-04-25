import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";
// import Button from "@material-ui/core/Button";
import { Button } from "@mui/material";
// core components

import buttonStyle from "../../styles/buttonStyle";

const makeComponentStyles = makeStyles(() => ({
  ...buttonStyle
}));

const ProButton = React.forwardRef((props, ref) => {
  const {
   
    type,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props;

  const classes = makeComponentStyles();

  const btnClasses = classNames({
    [classes.button]: true,
  
    [classes[size]]: size,
    [classes[type]]: type,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  });
  return (
    <Button {...rest} ref={ref} className={btnClasses}>
      {children}
    </Button>
  );
});

ProButton.propTypes = {
  // color: PropTypes.oneOf([
  //   "primary",
  //   "info",
  //   "success",
  //   "warning",
  //   "danger",
  //   "rose",
  //   "white",
  //   "facebook",
  //   "twitter",
  //   "google",
  //   "github",
  //   "transparent"
  // ]),
  size: PropTypes.oneOf(["sm", "lg"]),
// size: PropTypes.string,

  simple: PropTypes.bool,
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};

export default ProButton;
