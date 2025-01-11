const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'User',
        required: true,
    },
    items: [{
        menuItemId: {
            type: mongoose.Schema.Types.Mixed,
            ref: 'Menu',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1, // Ensure quantity is at least 1
        },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    estimatedDelivery: {
        type: Date,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending', // Default status is 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', OrderSchema);
