import express from 'express';
import userController from '../controllers/auth';


const router = express.Router();

router.post('/api/join', userController.postJoin);

router.post('/api/login', userController.postLogin);

module.exports = router;