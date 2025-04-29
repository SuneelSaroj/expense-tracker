import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
import { registerUser } from "../../service/authApi";
import { usePopUpContext } from "../../context/PopupMessage";
import "../../styles/LoginRegister.css";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setPopupMessage, setLoading } = usePopUpContext();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser(name, email, password);
      console.log("Registered successfully", response.data);

      if (response.status === 200 && response.data.success) {
        const user = response.data.user;

        // Save user to localStorage
        localStorage.setItem("userSession", JSON.stringify(user));

        setPopupMessage({
          state: true,
          type: "success",
          message: response.data.message || "Registration successful!",
        });

        // Navigate to dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setPopupMessage({
          state: true,
          type: "error",
          message: response.data.message || "Registration failed",
        });
      }
    } catch (err) {
      console.error("Error registering user: ", err);
      setPopupMessage({
        state: true,
        type: "error",
        message: err.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="register">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/* Left: Form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 480,
              padding: "2rem",
              margin: "auto",
              background: "transparent",
            }}
          >
            <Typography variant="h4" component="h1" mb={3}>
              REGISTER
            </Typography>

            <TextField
              fullWidth
              variant="standard"
              label="Name"
              type="text"
              className="inputField"
              onChange={(e) => setName(e.target.value)}
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
              label="Email"
              type="email"
              className="inputField"
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
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              variant="standard"
              label="Password"
              className="inputField"
              type={showPassword ? "text" : "password"}
              sx={{
                input: {
                  mt: 2,
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
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box mt={2} mb={2}>
              <Link
                component={RouterLink}
                to="/login"
                className="linkTo"
                underline="hover"
              >
                Already registered? Click here to login
              </Link>
            </Box>

            <Button
              variant="contained"
              color="success"
              sx={{ textTransform: "none", fontWeight: "bold", px: 5 }}
              onClick={handleRegister}
            >
              Register
            </Button>
          </Box>
        </Grid>

        {/* Right: Animation */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              style={{ width: "400px", height: "450px" }}
            ></lottie-player>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
