// Login.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Access the login method from context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { token } = response.data;
      login(token); // Use login from context to save the token and set user
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin}>
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
      <Button type="submit" variant="contained">Login</Button>
    </Box>
  );
};

export default Login;
