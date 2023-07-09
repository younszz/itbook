import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/user';
import passport from 'passport';

const router = express.Router();

router.get(
  '/api/user',
  passport.authenticate('jwt', { session: false }),
  getUser
);

router.post(
  '/api/user/:uid',
  passport.authenticate('jwt', { session: false }),
  updateUser
);

router.delete(
  '/api/user/:uid',
  passport.authenticate('jwt', { session: false }),
  deleteUser
);

export default router;
