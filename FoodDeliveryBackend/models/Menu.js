const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    picture: { type: String, required: true }, // Add this for image URLs
});

module.exports = mongoose.model('Menu', MenuSchema);





