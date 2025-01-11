import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, CardActions, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const { state, dispatch } = useAppContext();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Temporary menu items for testing
  const sampleMenu = [
    {
      _id: 1,
      name: 'Margherita Pizza',
      category: 'Pizza',
      price: 399,
      picture: 'https://bakerstable.net/wp-content/uploads/2021/03/Margherita-pizza-2021-3-e1614881538289.jpg',
    },
    {
      _id: 2,
      name: 'Cheeseburger',
      category: 'Burger',
      price: 499,
      picture: 'https://leitesculinaria.com/wp-content/uploads/2020/02/classic-cheeseburger-1200.jpg',
    },
    {
      _id: 3,
      name: 'Alfredo Pasta',
      category: 'Pasta',
      price: 350,
      picture: 'https://www.licious.in/blog/wp-content/uploads/2020/12/Penne-Alfredo-600x600.jpg',
    },
    {
      _id: 4,
      name: 'Caesar Salad',
      category: 'Salad',
      price: 379,
      picture: 'https://www.noracooks.com/wp-content/uploads/2022/06/vegan-caesar-salad-4.jpg',
    },
    {
      _id: 5,
      name: 'Grilled Chicken',
      category: 'Chicken',
      price: 450,
      picture: 'https://www.cookinwithmima.com/wp-content/uploads/2021/06/Grilled-BBQ-Chicken.jpg',
    },
    {
      _id: 6,
      name: 'Tacos',
      category: 'Mexican',
      price: 600,
      picture: 'https://www.thecookierookie.com/wp-content/uploads/2024/05/street-tacos-recipe-2.jpg',
    },
  ];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // Simulating API call, replace with your actual API URL
        dispatch({ type: 'SET_MENU', payload: sampleMenu });
      } catch (error) {
        console.error('Error fetching menu:', error);
        setError('Failed to fetch menu items. Please try again.');
      }
    };
    fetchMenu();
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#FFE5D9', // Light peach background
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          color: '#E76F51', // Deep peach color
          fontWeight: 'bold',
        }}
      >
        Explore Our Menu
      </Typography>

      {error && (
        <Typography
          color="error"
          variant="body2"
          sx={{ marginBottom: 2, textAlign: 'center' }}
        >
          {error}
        </Typography>
      )}

      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/cart')}
          sx={{
            backgroundColor: '#E76F51', // Deep peach button
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#D65A3D', // Slightly darker peach
            },
            paddingX: 4,
            borderRadius: 3,
          }}
        >
          View Cart
        </Button>
      </Box>

      <Grid container spacing={4}>
        {state.menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card
              sx={{
                backgroundColor: '#FFF1EC', // Subtle peach card background
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: 3,
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={item.picture}
                alt={item.name}
                sx={{
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: '#E76F51',
                  }}
                >
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.category} - ${item.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: '#E76F51',
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#D65A3D',
                    },
                    borderRadius: 3,
                  }}
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Menu;
