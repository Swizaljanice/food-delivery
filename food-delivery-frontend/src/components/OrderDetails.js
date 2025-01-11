import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Typography, TextField, Button, List, ListItem, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const { state, dispatch } = useAppContext();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!name || !address) {
      alert('Please fill out all fields.');
      return;
    }

    const estimatedDeliveryTime = new Date();
    estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 30);

    const newOrder = {
      customerName: name,
      deliveryAddress: address,
      items: state.cart.map((item) => ({
        itemId: item._id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
      })),
      total: totalPrice,
      date: new Date().toLocaleString(),
      estimatedDelivery: estimatedDeliveryTime.toLocaleString(),
    };

    try {
      const response = await fetch('http://localhost:5000/order/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error('Failed to place the order');
      }

      const data = await response.json();
      alert(data.message);

      dispatch({ type: 'ADD_ORDER', payload: newOrder });
      dispatch({ type: 'CLEAR_CART' });
      navigate('/order');
    } catch (error) {
      console.error('Error placing the order:', error);
      alert('Failed to place the order');
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: 'auto',
        marginTop: 5,
        backgroundColor: '#FFE5D9', // Peach background
        borderRadius: 5,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#E76F51', // Deep peach color
        }}
      >
        Enter Order Details
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        sx={{
          marginBottom: 3,
          backgroundColor: '#FFF1EC', // Light peach for inputs
          borderRadius: 2,
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Address"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        sx={{
          marginBottom: 3,
          backgroundColor: '#FFF1EC', // Light peach for inputs
          borderRadius: 2,
        }}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#E76F51',
          marginTop: 2,
        }}
      >
        Order Summary
      </Typography>

      <List
        sx={{
          backgroundColor: '#FFF1EC',
          borderRadius: 2,
          padding: 2,
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
        }}
      >
        {state.cart.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 1,
              borderBottom: index < state.cart.length - 1 ? '1px solid #FFDDD2' : 'none',
            }}
          >
            <Typography variant="body1" sx={{ color: '#E76F51' }}>
              {item.name} x {item.quantity}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#E76F51' }}>
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ marginY: 3, backgroundColor: '#FFDDD2' }} />
      <Typography
        variant="h6"
        sx={{
          textAlign: 'right',
          marginBottom: 3,
          fontWeight: 'bold',
          color: '#E76F51',
        }}
      >
        Total: ${totalPrice.toFixed(2)}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: '#E76F51',
          color: '#FFFFFF',
          paddingY: 1.5,
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#D65A3D',
          },
          borderRadius: 3,
        }}
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default OrderDetails;
