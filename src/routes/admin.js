const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 
const Category = require('../models/Category');
const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;//passport-jwt패키지의 일부. http요청 헤더로부터 JWT를 추출하는 메소드

const options = {
  //HTTP요청에서 JWT를 추출하는 방법을 정의. 
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

//passport 모듈을 사용하여 JWT인증 전략 설정. 
passport.use(new JwtStrategy(options, async (payload, done) => {
  const user = await User.findById(payload.id);

  //done(에러, 사용자객체)
  if (user) {
    return done(null, user);
  }else {
    return done(null, false);
  }
}));

// 관리자 확인 미들웨어
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send("Access Denied");
  }
}
// Product GET, POST. GET은 JWT를 확인하지않고 누구나 가능하도록 수정.
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch(err) {
    res.status(500).send(err);
  }
});

router.post('/product', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
  } catch(err) {
    res.status(500).send(err);
  }
});
//Category GET, POST. 카테고리 GET도 누구나 가능하도록 수정.
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch(err) {
    res.status(500).send(err);
  }
});

router.post('/category', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.send(category);
  } catch(err) {
    res.status(500).send(err);
  }
});

// PUT 
router.put('/product/:id', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(product);
  } catch(err) {
    res.status(500).send(err);
  }
});

router.put('/category/:id', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(category);
  } catch(err) {
    res.status(500).send(err);
  }
});

// DELETE 
router.delete('/product/:id', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({message: 'Product deleted'});
  } catch(err) {
    res.status(500).send(err);
  }
});

router.delete('/category/:id', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.send({message: 'Category deleted'});
  } catch(err) {
    res.status(500).send(err);
  }
});

module.exports = router;
