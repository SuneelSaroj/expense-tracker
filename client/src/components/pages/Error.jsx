import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {/* Lottie Animation */}
        <Grid item xs={12} md={6}>
          <lottie-player
            src="https://lottie.host/6a91a283-f6b2-475e-9ccf-8d7a38869b69/dcjjNCeXit.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            style={{ width: "400px", height: "400px" }}
          ></lottie-player>
        </Grid>

        {/* Error Message */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Oops! Something Went Wrong.
          </Typography>

          <Typography variant="body1" paragraph>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{ mt: 2 }}
          >
            Go to Homepage
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Error;
