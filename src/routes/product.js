import express from 'express';
import {
  getProducts,
  getproductDetail,
  postProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product';
import apiAdminRequired from '../middlewares/api-admin-required';

const router = express.Router();

router.get('/api/products', getProducts);

router.get('/api/product/:pid', getproductDetail);

router.post('/api/product/', apiAdminRequired, postProduct);

router.put('/api/product/:pid', apiAdminRequired, updateProduct);

router.delete('/api/product/:pid', apiAdminRequired, deleteProduct);

export default router;
