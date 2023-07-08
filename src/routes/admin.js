import express from 'express';
import adminController from '../controllers/admin';

const router = express.Router();

router.post('/api/product', adminController.postAddProduct);

router.post('/api/product/:id', adminController.postEditProduct);

router.delete('/api/product/:id', adminController.deleteProduct);

router.get('/api/category', adminController.getCategories);

router.post('/api/category', adminController.updateCategory);

module.exports = router;
