import express from 'express';
import categoryController from '../controllers/category';
const passport = require('passport');


const router = express.Router();
router.get('/api/category', categoryController.getCategories);

router.post('/api/category', passport.authenticate('jwt', { session: false}), categoryController.updateCategory);

export default router;
