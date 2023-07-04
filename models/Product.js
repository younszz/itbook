const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    imageUrl: String,
    description: String
});

module.exports = mongoose.model('Product', productSchema);
