const express = require('express');
const Order = require('../models/Order');
const Menu = require('../models/Menu');
 
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, items } = req.body;
    try {
        let totalAmount = 0;

        for (const item of items) {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem) throw new Error('Menu item not found');
            totalAmount += menuItem.price * item.quantity;
        }

        const newOrder = new Order({ userId, items, totalAmount });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


  

module.exports = router;