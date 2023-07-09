import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

router.post('/api/join', authController.postJoin);

router.post('/api/login', authController.postLogin);

module.exports = router;