const express = require('express');
const shopController = require('../controller/shop');
const router = express.Router();

router.post('/products', shopController.postAddProduct);
<<<<<<< HEAD

router.get('/products', shopController.getProducts);

router.get('/api/product/:pid', shopController.getproductDetail);

=======
router.get('/products', shopController.getProducts);

>>>>>>> dev-BE-kyungyun
module.exports = router; 
