import * as React from "react";
import { styled } from "@mui/system";
import SwitchUnstyled, {
  switchUnstyledClasses
} from "@mui/base/SwitchUnstyled";

const darkteal = {
  500: '#febd69'  // dark
};

const color = {
  400: '#cccccc', //when close background color
  500: "blue"
};

const Root = styled("span")`
  font-size: 0;
  position: relative;
  display: inline-block;
  
  width: 42px;
  height: 24px;

  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${color[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 20px;
    height: 20px;
    top: 2px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 400ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${color[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 20px;
      top: 2px;
      background-color: rgb(255, 255, 255);
    }

    .${switchUnstyledClasses.track} {
      background: ${darkteal[500]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
`;

export default function SwitchPro(props) {
  //   const label = { componentsProps: { input: { "aria-label": "Demo switch" } } };
  return (
    <div>
      <SwitchUnstyled component={Root} checked={props.checked} onChange={props.onChange} />
      {/* <SwitchUnstyled component={Root} {...label} />
      <SwitchUnstyled component={Root} {...label} defaultChecked disabled />
      <SwitchUnstyled component={Root} {...label} disabled /> */}
    </div>
  );
}