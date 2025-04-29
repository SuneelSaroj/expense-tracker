import React, { useState } from "react";
import "../../styles/LoginRegister.css";
import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
// import { motion } from "framer-motion";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { usePopUpContext } from "../../context/PopupMessage";
import { loginUser } from "../../service/authApi";
import { useSession } from "../../context/SessionContext";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setPopupMessage, setLoading } = usePopUpContext();
  const { login } = useSession();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(email, password); // call your API
      console.log("Logged in successfully", response.data);

      if (response.status === 200) {
        // Save user session to localStorage
        localStorage.setItem("userSession", JSON.stringify(response.data.user));

        // Redirect user after login
        setPopupMessage({
          state: true,
          type: "success",
          message: "Logged in successfully!",
        });

        login(response.data.user);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      console.error("Error logging in: ", err);
      setPopupMessage({
        state: true,
        type: "error",
        message: err.response?.data?.message || "Login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/* Animated Lottie */}
        <Grid item xs={12} md={6}>
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            style={{ width: "400px", height: "450px", marginRight: "150px" }}
          ></lottie-player>
        </Grid>

        {/* Login Form shifted to right side */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 480,
              padding: "2rem",
              background: "transparent",
              marginLeft: "auto", // Aligns the form to the right
              marginRight: "10%", // Adds extra space on the right side to shift more
            }}
          >
            <Typography variant="h4" component="h1" mb={3}>
              LOGIN
            </Typography>

            <TextField
              fullWidth
              variant="standard"
              label="Email"
              type="email"
              className="inputField"
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                input: {
                  color: "white", // Sets text color to white
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Sets label color to white
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "white", // Sets underline color to white
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "white", // Sets underline hover color to white
                },
                "& .MuiInput-underline.Mui-focused:before": {
                  borderBottomColor: "white", // Sets underline focus color to white
                },
              }}
            />

            <TextField
              fullWidth
              variant="standard"
              label="Password"
              type="password"
              className="inputField"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mt: 2,
                input: {
                  color: "white", // Sets text color to white
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Sets label color to white
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "white", // Sets underline color to white
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "white", // Sets underline hover color to white
                },
                "& .MuiInput-underline.Mui-focused:before": {
                  borderBottomColor: "white", // Sets underline focus color to white
                },
              }}
            />

            <Box mt={2} mb={2}>
              <Link
                component={RouterLink}
                to="/register"
                className="linkTo"
                underline="hover"
              >
                New User? Click Here To Register
              </Link>
            </Box>

            <Button
              variant="contained"
              color="success"
              onClick={handleLogin}
              sx={{ textTransform: "none", fontWeight: "bold", px: 5 }}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
