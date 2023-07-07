import express from 'express';
import adminController from '../controller/admin';

const router = express.Router();

router.post('/api/product', adminController.postProduct);

router.delete('/api/product/:id', adminController.deleteProduct);

module.exports = router;
