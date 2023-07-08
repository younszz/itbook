import express from 'express';
import passport from 'passport';
import isAdmin from '../middleware/admin';
import adminController from '../controller/admin';

const router = express.Router();

//주문 조회 수정 삭제
router.get('/api/order', passport.authenticate('jwt', { session: false }), isAdmin, adminController.getOrders);
router.put('/api/order/', passport.authenticate('jwt', { session: false }), isAdmin, adminController.editOrder);
router.delete('/api/order/', passport.authenticate('jwt', { session: false }), isAdmin, adminController.deleteOrder);


//상품 추가 삭제 수정
router.post('/api/product/', passport.authenticate('jwt', { session: false }), isAdmin, adminController.postProduct);
router.put('/api/product/', passport.authenticate('jwt', { session: false }), isAdmin, adminController.postEditProduct);
router.delete('/api/product/', passport.authenticate('jwt', { session: false }), isAdmin, adminController.deleteProduct);

//카테고리 조회 수정
router.get('/api/category', passport.authenticate('jwt', { session: false }), isAdmin, adminController.getCategories);
router.post('/api/category', passport.authenticate('jwt', { session: false }), isAdmin, adminController.updateCategory);

module.exports = router;

