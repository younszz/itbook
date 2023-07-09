import express from 'express';
import productController from '../controllers/product';
import passport from 'passport';
import isAdmin from '../middlewares/admin-required';


const router = express.Router();

router.get('/api/products', productController.getProducts);

router.get('/api/product/:pid', productController.getproductDetail);

router.post('/api/product/', passport.authenticate('jwt', { session: false}), isAdmin, productController.postProduct);

router.put('/api/product/:pid', passport.authenticate('jwt', { session: false}), isAdmin, productController.updateProduct);

router.delete('/api/product/:pid', passport.authenticate('jwt', { session: false}), isAdmin, productController.deleteProduct);

module.exports = router;
