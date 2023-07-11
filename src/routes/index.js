const { Router } = require('express');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password');
import User from '../models/user';

const router = Router();

router.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/posts');
    return;
  }

  res.redirect('/login');
});

router.get('/login', (req, res, next) => {
  res.render('user/login');
});

router.get('/join', (req, res, next) => {
  res.render('user/join');
});

router.post(
  '/join',
  asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        email,
        name,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.send({ token });
    } else {
      return res.status(400).json('이미 존재하는 email 입니다.');
    }
    res.redirect('/');
  })
);

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
