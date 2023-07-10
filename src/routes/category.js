import express from 'express';
import {getCategories, updateCategory} from '../controllers/category';
import passport from 'passport';
import isAdmin from '../middlewares/admin-required';

const router = express.Router();

router.get('/api/category', getCategories);

router.post('/api/category', passport.authenticate('jwt', { session: false}), isAdmin, updateCategory);

export default router;
