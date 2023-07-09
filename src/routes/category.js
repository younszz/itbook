import express from 'express';
import categoryController from '../controllers/category';

const router = express.Router();
router.get('/api/category', categoryController.getCategories);

router.post('/api/category', categoryController.updateCategory);

export default router;
