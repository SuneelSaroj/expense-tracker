import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import { TextField } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
    //   margin: 5,
      // maxWidth:"20px"
    //   padding:"5px",
    borderRadius: "5px",
      width: "100%",
      background: "white",
      "& .MuiOutlinedInput-multiline ":{
    padding: "5px"
}
    }
  },
  textarea: {
    // resize: "both"
    // padding:"5px"
  }
}));

export default function TextArea(props) {
  const classes = useStyles();

  return (
    
      <>
        <TextField
        sx={{
           height: "fit-content",
        paddding:0,
        borderRadius: "5px",
        // marginLeft: "5px",
        // margin:"0 0 0 5px",
        width: props.width?props.width:"100%",
        // margin:margin,
        background: "white",
        // height:"24px",
       
        "& .MuiOutlinedInput-root ":{
          padding: "4px!important",
     
          // paddingLeft: "5px!important"
          
  }}}
          id="outlined-textarea"
          // label="Multiline Placeholder"
        //   placeholder="Placeholder"
          multiline
          // maxRows={1}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          rows={props.rows}
          variant="outlined"
        />
        </>
      
  );
}
