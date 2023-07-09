import express from 'express';
import productController from '../controllers/product';
import passport from 'passport';

const router = express.Router();

router.get('/api/products', productController.getProducts);

router.get('/api/product/:pid', productController.getproductDetail);

router.post('/api/product/', passport.authenticate('jwt', { session: false}), productController.postProduct);

router.put('/api/product/:pid', passport.authenticate('jwt', { session: false}), productController.updateProduct);

router.delete('/api/product/:pid', passport.authenticate('jwt', { session: false}), productController.deleteProduct);

module.exports = router;
