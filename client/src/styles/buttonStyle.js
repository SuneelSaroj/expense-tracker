const lightTeal = "#D2E0E8";
const darkTeal = " #6D92A5";
const mediumTeal = " #A0BBCA";
const yellow = "#FFEC9B";
const buttonStyle = {
  button: {
    width: " 120px",
    height: "30px",
    minHeight: "auto",
    minWidth: "auto",
    backgroundColor: "#5b7a8f", //todo
    color: "#FFFFFF",
    //   boxShadow:
    //     "0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)",
    border: "none",
    borderRadius: "5px",
    position: "relative",
    padding: "5px 5px",
    // margin: ".3125rem 1px",
    fontSize: "12px",
    fontWeight: "400",
    textTransform: "capitalize",
    letterSpacing: "0",
    willChange: "box-shadow, transform",
    transition:
      "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    lineHeight: "1.42857143",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    "&:hover,&:focus": {
      color: "#FFFFFF",
      backgroundColor: " #5b7a8f", //todo
      // boxShadow: `0 14px 26px -12px ${primaryColor}, 0 4px 23px 0px ${primaryColor}, 0 8px 10px -5px ${primaryColor}`
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      display: "inline-block",
      top: "0",
      fontSize: "1.1rem",
      marginRight: "2px",
      verticalAlign: "middle",
    },
    "& svg": {
      position: "relative",
      display: "inline-block",
      top: "0",
      // width: "18px",
      // height: "18px",
      marginRight: "2px",

      verticalAlign: "middle",
    },
    "&$justIcon": {
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        marginRight: "0px",
        position: "absolute",
        width: "100%",
        transform: "none",
        left: "0px",
        top: "0px",
        height: "100%",
        lineHeight: "41px",
        fontSize: "20px",
      },
    },
  },
  fullWidth: {
    width: "100%",
  },

  lightTeal: {
    backgroundColor: lightTeal, //todo,
    color: "#000000",
    // boxShadow: "0 2px 2px 0 rgba(156, 39, 176, 0.14), 0 3px 1px -2px rgba(156, 39, 176, 0.2), 0 1px 5px 0 rgba(156, 39, 176, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: `${lightTeal}`,
      boxShadow: `0 5px 10px -6px ${lightTeal}`,
      color: "#000000",
    },
  },
  darkTeal: {
    backgroundColor: darkTeal, //todo,
    color: "#000000",
    // boxShadow: "0 2px 2px 0 rgba(156, 39, 176, 0.14), 0 3px 1px -2px rgba(156, 39, 176, 0.2), 0 1px 5px 0 rgba(156, 39, 176, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: `${darkTeal}`,
      boxShadow: `0 5px 10px -6px ${darkTeal}`,
      color: "#000000",
    },
  },
  danger: {
    width: "30px",
    height: "30px",

    backgroundColor: " #A80019", //todo,
    color: "#ffffff",
    "&:hover,&:focus": {
      backgroundColor: "#A80019",
      boxShadow: `0 5px 10px -6px #A80019`,
      color: "#ffffff",
    },
  },
  icon: {
    width: "30px",
    height: "30px",

    // height: "2.5rem",
    // backgroundColor:  " #A80019",//todo,
    color: "#ffffff",
  },
  go: {
    marginBottom: "2px",
    width: "30px",
    height: "28px",
    // backgroundColor:  " #A80019",//todo,
    color: "#ffffff",
  },
  goNext: {
    marginBottom: "2px",
    width: "30px",
    height: "28px",
    backgroundColor: yellow, //todo,
    color: "#ffffff",
    "&:hover,&:focus": {
      backgroundColor: yellow,
      boxShadow: `0 5px 10px -6px #A80019`,
      color: "#ffffff",
    },
  },
  mediumTeal: {
    backgroundColor: mediumTeal, //todo,
    color: "#000000",
    // boxShadow: "0 2px 2px 0 rgba(156, 39, 176, 0.14), 0 3px 1px -2px rgba(156, 39, 176, 0.2), 0 1px 5px 0 rgba(156, 39, 176, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: `${mediumTeal}`,
      boxShadow: `0 5px 10px -6px ${mediumTeal}`,
      color: "#000000",
    },
  },
  warning: {
    backgroundColor: "#0000000", //todo
    boxShadow:
      "0 2px 2px 0 rgba(255, 152, 0, 0.14), 0 3px 1px -2px rgba(255, 152, 0, 0.2), 0 1px 5px 0 rgba(255, 152, 0, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#0000000", //todo
      boxShadow:
        "0 14px 26px -12px rgba(255, 152, 0, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(255, 152, 0, 0.2)",
    },
  },
  white: {
    "&,&:focus,&:hover,&:visited": {
      backgroundColor: "#FFFFFF",
      color: "#FFFFFF", //todo
    },
  },
  simple: {
    "&,&:focus,&:hover,&:visited": {
      color: "#FFFFFF",
      background: "transparent",
      boxShadow: "none",
    },
  },
  close: {
    width: "28px",
    height: "28px",
    backgroundColor: darkTeal, //todo,
    color: "#ffffff",
    "&:hover,&:focus": {
      backgroundColor: darkTeal,
      boxShadow: `0 5px 10px -6px ${darkTeal}`,
      color: "#ffffff",
    },
  },
  backBtn: {
    width: "28px",
    height: "28px",
    backgroundColor: "#ffffff", //todo,
    color: darkTeal,
    "&:hover,&:focus": {
      backgroundColor: "#ffffff",
      boxShadow: `0 5px 10px -6px ${darkTeal}`,
      color: darkTeal,
    },
  },
  transparent: {
    "&,&:focus,&:hover,&:visited": {
      color: "inherit",
      background: "transparent",
      boxShadow: "none",
    },
  },
  disabled: {
    opacity: "0.65",
    pointerEvents: "none",
  },
  lg: {
    width: 150,
  },
  sm: {
    padding: "0.40625rem 1.25rem",
    fontSize: "0.6875rem",
    lineHeight: "1.5",
    borderRadius: "0.2rem",
  },
  round: {
    borderRadius: "20px",
  },
  block: {
    width: "100% !important",
  },
  link: {
    "&,&:hover,&:focus": {
      backgroundColor: "transparent",
      color: "#999999",
      boxShadow: "none",
    },
  },
  justIcon: {
    paddingLeft: "12px",
    paddingRight: "12px",
    fontSize: "30px",
    height: "41px",
    minWidth: "41px",
    width: "41px",
    "& .fab,& .fas,& .far,& .fal,& svg,& .material-icons": {
      marginRight: "0px",
    },
    "&$lg": {
      height: "57px",
      minWidth: "57px",
      width: "57px",
      lineHeight: "56px",
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "32px",
        lineHeight: "56px",
      },
      "& svg": {
        width: "32px",
        height: "32px",
      },
    },
    "&$sm": {
      height: "30px",
      minWidth: "30px",
      width: "30px",
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "17px",
        lineHeight: "29px",
      },
      "& svg": {
        width: "17px",
        height: "17px",
      },
    },
  },
  //upload button type
  upload: {
    //todo,

    height: "2em !important",

    // boxShadow: "0 2px 2px 0 rgba(156, 39, 176, 0.14), 0 3px 1px -2px rgba(156, 39, 176, 0.2), 0 1px 5px 0 rgba(156, 39, 176, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: `white`,
      boxShadow: `0 5px 10px -6px $white`,
      color: "#000000",
    },
  },
};

export default buttonStyle;
