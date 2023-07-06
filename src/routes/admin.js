import express from 'express';
import adminController from '../controller/admin';

const router = express.Router();

router.post('/api/product', adminController.postAddProduct);

module.exports = router;
