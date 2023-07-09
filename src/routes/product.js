import express from 'express';
import productController from '../controllers/product';

const router = express.Router();

router.get('/api/products', productController.getProducts);

router.get('/api/product/:pid', productController.getproductDetail);

router.post('/api/product/', productController.postProduct);

router.put('/api/product/', productController.updateProduct);

router.delete('/api/product/', productController.deleteProduct);

module.exports = router;
