import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../assets/star_software.gif";

const Footer = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      borderTop="1px solid #ccc"
      position="fixed" // Fixed position for the footer
      bottom="0" // Align at the bottom
      left="0"
      right="0" // Stretch to the right edge
      bgcolor="#fff" // Background color
      width="100%" // Stretch to full width
      // mt={20
    >
      <div>
        <img
          src={logo}
          alt="Star Software"
          style={{ width: "150px", height: "auto", paddingLeft: 20 }}
        />
      </div>
      <div>
        <Typography
          variant="body2"
          color="textSecondary"
          align="right"
          paddingRight={4}>
          Designed & Maintained by StarSoftware | All rights reserved.
        </Typography>
      </div>
    </Box>
  );
};

export default Footer;
