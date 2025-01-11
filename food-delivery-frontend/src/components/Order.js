import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Typography, List, ListItem, Box, Divider } from '@mui/material';

const Order = () => {
  const { state, dispatch } = useAppContext();

  const formatPrice = (price) => {
    return price && !isNaN(price) ? price.toFixed(2) : 'N/A'; // Safely format price
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!state.token) {
          console.error('Token is missing');
          return; // Exit if the token is not available
        }

        const response = await fetch('http://localhost:5000/order', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${state.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Order Placed!!');
        }

        const data = await response.json();

        dispatch({ type: 'SET_ORDERS', payload: data });
        alert('Order placed successfully!');
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Congratulations!');
      }
    };

    fetchOrders();
  }, [state.token]); // Run effect only when token changes

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 800,
        margin: 'auto',
        backgroundColor: '#FFE5D9', // Peach background
        borderRadius: 4,
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
        Order History
      </Typography>

      {state.orders.length === 0 ? (
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
          No orders have been placed yet.
        </Typography>
      ) : (
        <List>
          {state.orders.map((order, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: 3,
                padding: 3,
                borderRadius: 4,
                backgroundColor: '#FFF1EC', // Light peach for each order box
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h6" sx={{ color: '#E76F51' }}>
                Order #{index + 1} - {order.date}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1, color: '#E76F51' }}>
                Estimated Delivery: {order.estimatedDelivery || 'N/A'}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1, color: '#E76F51' }}>
                Delivery Address: {order.deliveryAddress || 'N/A'}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1, color: '#E76F51' }}>
                Customer Name: {order.customerName || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: 2, color: '#E76F51' }}>
                Items:
              </Typography>
              <List>
                {order.items.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 1,
                      borderBottom: idx < order.items.length - 1 ? '1px solid #FFDDD2' : 'none',
                    }}
                  >
                    <Typography variant="body1" sx={{ color: '#E76F51' }}>
                      {item.name} x {item.quantity}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#E76F51', fontWeight: 'bold' }}>
                      ${formatPrice(item.price * item.quantity)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ marginY: 2, backgroundColor: '#FFDDD2' }} />
              <Typography variant="h6" sx={{ color: '#E76F51' }}>
                Total: ${formatPrice(order.total)}
              </Typography>
            </Box>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Order;
