import express from 'express';
import categoryController from '../controllers/category';
import passport from 'passport';
import isAdmin from '../middlewares/admin-required';

const router = express.Router();
router.get('/api/category', categoryController.getCategories);

router.post('/api/category', passport.authenticate('jwt', { session: false}), isAdmin, categoryController.updateCategory);

export default router;
