const express = require('express');
const Menu = require('../models/Menu');

const router = express.Router();

// Preload default menu items on server start
const preloadMenuItems = async () => {
    const defaultItems = [
        { name: 'Pizza', category: 'Main Course', price: 12.99, availability: true, picture: 'url-to-pizza-image' },
        { name: 'Pasta', category: 'Main Course', price: 10.99, availability: true, picture: 'url-to-pasta-image' },
        { name: 'Burger', category: 'Snacks', price: 8.99, availability: true, picture: 'url-to-burger-image' },
        { name: 'Salad', category: 'Appetizers', price: 6.99, availability: true, picture: 'url-to-salad-image' },
    ];

    try {
        const itemCount = await Menu.countDocuments();
        if (itemCount === 0) {
            await Menu.insertMany(defaultItems);
            console.log('Default menu items preloaded successfully.');
        }
    } catch (error) {
        console.error('Error preloading menu items:', error.message);
    }
};

preloadMenuItems();

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Disable the POST route (optional)
router.post('/', (req, res) => {
    res.status(403).json({ message: 'Adding new menu items is not allowed.' });
});

// Update menu item
router.put('/:id', async (req, res) => {
    try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
