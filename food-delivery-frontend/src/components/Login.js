import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      const { token, user } = response.data;
      dispatch({ type: 'LOGIN', payload: { token, user } });
      localStorage.setItem('token', token);
      navigate('/menu');
    } catch (error) {
      console.error('Login failed:', error);
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
        Welcome to Food Delivery System
      </Typography>
      <Typography variant="body1" sx={{ color: '#6A4F4B', textAlign: 'center' }}>
        Log in to your account to start ordering delicious food!
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
        onClick={handleLogin}
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
        Login
      </Button>
      <Typography variant="body2" sx={{ marginTop: 2, color: '#6A4F4B' }}>
        Don't have an account?{' '}
        <Link
          component={RouterLink}
          to="/register"
          sx={{ color: '#E76F51', textDecoration: 'none', fontWeight: 'bold' }}
        >
          Register here
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
