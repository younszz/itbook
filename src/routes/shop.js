const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();

router.get('/api/products', shopController.getProducts);

router.get('/api/product/:pid', shopController.getproductDetail);

router.get('/api/category', shopController.getCategories);

router.post('/api/category', shopController.updateCategory);

module.exports = router; 
