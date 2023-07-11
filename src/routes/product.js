import express from 'express';
import {
  getProducts,
  getproductDetail,
  postProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product';
import passport from 'passport';

const router = express.Router();

router.get('/api/products', getProducts);

router.get('/api/product/:pid', getproductDetail);

router.post('/api/product/', postProduct);

router.put('/api/product/:pid', updateProduct);

router.delete('/api/product/:pid', deleteProduct);

export default router;
