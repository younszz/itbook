import express from 'express';
import userController from '../controllers/user';
import passport from 'passport';
const router = express.Router();

router.get(
  '/api/user',
  passport.authenticate('jwt', { session: false }),
  userController.getUser
);

router.post(
  '/api/user/:uid',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser
);

router.delete(
  '/api/user/:uid',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser
);

module.exports = router;
