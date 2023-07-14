import express from 'express';
import { getCategories, updateCategory } from '../controllers/category';
import apiAdminRequired from '../middlewares/api-admin-required';

const router = express.Router();

router.get('/api/category', getCategories);

router.post('/api/category', apiAdminRequired, updateCategory);

export default router;
