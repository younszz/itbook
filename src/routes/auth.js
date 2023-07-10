import express from 'express';
import { postJoin, postLogin } from '../controllers/auth';

const router = express.Router();

router.post('/api/join', postJoin);

router.post('/api/login', postLogin);

export default router;
