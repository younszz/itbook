const express = require('express');
const productController = require('../controllers/product');
const router = express.Router();

router.get('/api/products', productController.getProducts);

router.get('/api/product/:pid', productController.getproductDetail);

module.exports = router; 
