import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";



const  AdvanceTextField =React.forwardRef((props, ref) => {
    const {   
        width,
        InputProps,
        margin,
        type,
        
         ...rest
       } = props;
    const useStyles = makeStyles((theme) => ({
        root: { 
          
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ffffff"
          // border-width: 2px;
        },
       
          "& .MuiTextField-root": {
          //   margin: 5,
            // maxWidth:"20px"
          //   padding:"5px",
          borderRadius: "5px",
            width: width,
            margin:margin,
            background: "white",
            // height:"24px",
          
            "& .MuiOutlinedInput-input  ":{
              padding: "4px",
              
              // paddingLeft: "5px"
      },
    
          }
        },
        textarea: {
          // resize: "both"
          // padding:"5px"
        }
      }));
 
 
    const classes = useStyles();

  return (
    <form className={classes.root}  autoComplete="off">
      {/* <div> */}
        <TextField
        {...rest}
        ref={props.ref}
          id="outlined-textarea"
          // label="Multiline Placeholder"
        //   placeholder="Placeholder"
        //   multiline
          // maxRows={1}
          // defaultValue={props.defaultValue}
          // onChange={props.onChange}
          // rows={props.rows}
          variant="outlined"
          type={props.type}
          // value={props.value}
          // inputProps={{ maxLength:props.maxlength,className: classes.textarea }}
        />
      {/* </div> */}
    </form>
  );
});

export default AdvanceTextField;

