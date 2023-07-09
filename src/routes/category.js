import express from 'express';
import categoryController from '../controllers/category';
import passport from 'passport'
const router = express.Router();
router.get('/api/category', categoryController.getCategories);

router.post('/api/category', passport.authenticate('jwt', { session: false}), categoryController.updateCategory);

export default router;
