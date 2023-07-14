import express from 'express';
import { getCategories, updateCategory } from '../controllers/category';

const router = express.Router();

router.get('/api/category', getCategories);

router.post('/api/category', updateCategory);

export default router;
