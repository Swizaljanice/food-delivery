// cartRoutes.js
const express = require('express');
const Cart = require('../models/Cart'); // Assuming you have a Cart model
const authenticateUser = require('../middleware/authenticateUser');
const router = express.Router();

// Get the current user's cart
router.get('/', authenticateUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.itemId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    // console.error('Error fetching cart:', error.message);
    // res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add or update an item in the cart
router.put('/update', authenticateUser, async (req, res) => {
  const { itemId, quantity } = req.body;

  if (!itemId || quantity === undefined) {
    return res.status(400).json({ error: 'Item ID and quantity are required' });
  }

  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] }); // Create a new cart if it doesn't exist
    }

    const itemIndex = cart.items.findIndex((item) => item.itemId.toString() === itemId);
    if (itemIndex !== -1) {
      // Item exists in the cart, update the quantity
      cart.items[itemIndex].quantity = quantity;
    } else {
      // Item doesn't exist, add it to the cart
      cart.items.push({ itemId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart:', error.message);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Remove an item from the cart
router.delete('/remove', authenticateUser, async (req, res) => {
  const { itemId } = req.body;

  if (!itemId) {
    return res.status(400).json({ error: 'Item ID is required' });
  }

  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex((item) => item.itemId.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1); // Remove item from cart
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error.message);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

module.exports = router;
