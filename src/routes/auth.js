import { Router } from 'express';
import passport from 'passport';
import { postLogin, postJoin } from '../controllers/auth';

const router = Router();

router.post(
  '/api/login',
  passport.authenticate('local', { session: false }),
  postLogin
);

router.post('/api/join', postJoin);

export default router;
