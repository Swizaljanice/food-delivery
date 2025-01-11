import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Login from './components/Login';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Order from './components/Order';
import Register from './components/Register';
import OrderDetails from './components/OrderDetails'; // Import OrderDetails component
import { CssBaseline, Container } from '@mui/material';

// ProtectedRoute to ensure only authenticated users can access certain routes
const ProtectedRoute = ({ element }) => {
  const { state } = useAppContext();
  return state.token ? element : <Navigate to="/" />;
};

const App = () => {
  return (
    <AppProvider>
      <CssBaseline />
      <Router>
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/menu" element={<ProtectedRoute element={<Menu />} />} />
            <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
            <Route path="/order-details" element={<ProtectedRoute element={<OrderDetails />} />} />
            <Route path="/order" element={<ProtectedRoute element={<Order />} />} />
          </Routes>
        </Container>
      </Router>
    </AppProvider>
  );
};

console.log('App Loaded');

export default App;
