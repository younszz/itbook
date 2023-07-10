import express from 'express';
import { getProducts, getproductDetail, postProduct, updateProduct, deleteProduct } from '../controllers/product';
import passport from 'passport';
import isAdmin from '../middlewares/admin-required';

const router = express.Router();

router.get('/api/products', getProducts);

router.get('/api/product/:pid', getproductDetail);

router.post('/api/product/', passport.authenticate('jwt', { session: false}), isAdmin, postProduct);

router.put('/api/product/:pid', passport.authenticate('jwt', { session: false}), isAdmin, updateProduct);

router.delete('/api/product/:pid', passport.authenticate('jwt', { session: false}), isAdmin, deleteProduct);

export default router;
