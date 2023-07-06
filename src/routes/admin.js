const express = require('express');
const adminController = require('../controller/admin');
const router = express.Router();


router.get('/api/admin/product', adminController.postAddProduct);

module.exports = router;
