// routes/orderDetailRoutes.js
const express = require('express');
const OrderDetail = require('../models/OrderDetail');
const authenticateUser = require('../middleware/authenticateUser'); // Authentication middleware
const router = express.Router();

// Place an order (store order details)
router.post('/place-order', authenticateUser, async (req, res) => {
  const { customerName, deliveryAddress, items, total, date, estimatedDelivery } = req.body;

  try {
    console.log('Received order details:', req.body);
    // Create a new order detail document in the database
    const newOrderDetail = new OrderDetail({
      customerName,
      deliveryAddress,
      items,
      total,
      date,
      estimatedDelivery,
    });

    // Save the order to the database
    await newOrderDetail.save();
    console.log('Order saved successfully:', newOrderDetail);

    res.status(201).json({ message: 'Order placed successfully!', orderDetail: newOrderDetail });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});


router.get('/', authenticateUser, async (req, res) => {
    console.log('Authenticated user:', req.user); // Log the user object
  
    try {
      const orders = await Order.find({ userId: req.user._id }).populate('items.menuItemId');
      console.log('Orders fetched:', orders); // Log the fetched orders
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error); // Log the error
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;
