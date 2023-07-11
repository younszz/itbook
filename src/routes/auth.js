const { Router } = require('express');
const passport = require('passport');
const router = Router();
import { postLogin, postJoin } from '../controllers/auth';

router.post(
  '/api/login',
  passport.authenticate('local', { session: false }),
  postLogin
);

router.post('/api/join', postJoin);

module.exports = router;
