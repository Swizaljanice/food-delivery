import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { List, ListItem, Typography, Box, IconButton, Button, Divider } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await fetch('/cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch cart');

        const cartData = await response.json();
        dispatch({ type: 'SET_CART', payload: cartData.items });
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    if (state.token) fetchCart();
  }, [state.token, dispatch]);

  const handleUpdateQuantity = async (itemId, increment) => {
    const item = state.cart.find((item) => item._id === itemId);
    const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;

    if (newQuantity <= 0) return;

    dispatch({ type: 'UPDATE_CART_ITEM', payload: { itemId, increment } });

    try {
      const response = await fetch('/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({ itemId, quantity: newQuantity }),
      });

      if (!response.ok) throw new Error('Failed to update cart item');

      const updatedCart = await response.json();
      dispatch({ type: 'SET_CART', payload: updatedCart.items });
    } catch (error) {
      console.error('Error updating item quantity:', error);
      // alert('Failed to update cart item');
    }
  };

  const handleRemoveItem = async (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });

    try {
      const response = await fetch('/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) throw new Error('Failed to remove item from cart');

      const updatedCart = await response.json();
      dispatch({ type: 'SET_CART', payload: updatedCart.items });
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item from cart');
    }
  };

  const handleProceedToOrder = () => {
    if (state.cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/order-details');
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 700,
        margin: 'auto',
        marginTop: 5,
        backgroundColor: '#FFE5D9', // Light peach background
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
        Your Cart
      </Typography>

      {loading ? (
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
          Loading cart...
        </Typography>
      ) : state.cart.length === 0 ? (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ textAlign: 'center', marginTop: 3 }}
        >
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <List>
            {state.cart.map((item) => (
              <React.Fragment key={item._id}>
                <ListItem
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                    backgroundColor: '#FFF1EC', // Subtle peach card background
                    borderRadius: 3,
                    marginBottom: 2,
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#E76F51' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${item.price.toFixed(2)} each
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleUpdateQuantity(item._id, false)}
                      disabled={item.quantity <= 1}
                      sx={{
                        backgroundColor: '#FFE5D9',
                        '&:hover': {
                          backgroundColor: '#F4D3C3',
                        },
                      }}
                    >
                      <Remove />
                    </IconButton>
                    <Typography
                      variant="body1"
                      sx={{
                        marginX: 2,
                        fontWeight: 'bold',
                        color: '#E76F51',
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleUpdateQuantity(item._id, true)}
                      sx={{
                        backgroundColor: '#FFE5D9',
                        '&:hover': {
                          backgroundColor: '#F4D3C3',
                        },
                      }}
                    >
                      <Add />
                    </IconButton>
                  </Box>

                  <Typography variant="h6" sx={{ color: '#E76F51', fontWeight: 'bold' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>

                  <IconButton
                    size="small"
                    color="secondary"
                    onClick={() => handleRemoveItem(item._id)}
                    sx={{
                      marginLeft: 2,
                      color: '#FF6B6B',
                      '&:hover': {
                        color: '#E63946',
                      },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
              </React.Fragment>
            ))}
          </List>

          <Divider sx={{ marginY: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#E76F51',
              }}
            >
              Total: ${totalPrice.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#E76F51',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#D65A3D',
                },
                borderRadius: 3,
                paddingX: 4,
              }}
              onClick={handleProceedToOrder}
            >
              Proceed to Order
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
