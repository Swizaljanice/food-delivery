import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { username, password });
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        padding: 4,
        borderRadius: 4,
        backgroundColor: '#FFE5D9', // Peach background
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: 400,
        margin: 'auto',
        marginTop: 8,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#E76F51', // Deep peach color
          fontWeight: 'bold',
          textAlign: 'center',
        }}
        gutterBottom
      >
        Create Your Account
      </Typography>
      <Typography variant="body1" sx={{ color: '#6A4F4B', textAlign: 'center' }}>
        Join us and start ordering your favorite meals today!
      </Typography>
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{
          backgroundColor: '#FFFFFF', // White text field background
          borderRadius: 2,
        }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
        }}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={handleRegister}
        sx={{
          backgroundColor: '#E76F51', // Deep peach button
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#D65A3D', // Slightly darker peach on hover
          },
          paddingY: 1.5,
          borderRadius: 3,
        }}
      >
        Register
      </Button>
    </Box>
  );
};

export default Register;
