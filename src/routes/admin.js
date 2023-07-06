const express = require('express');
const adminController = require('../controller/admin');
const router = express.Router();


router.post('/api/product', adminController.postAddProduct);

module.exports = router;
