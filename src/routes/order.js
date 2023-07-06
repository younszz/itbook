const express = require('express');
const passport = require('passport');
const Order = require('../models/Order');

const router = express.Router();

router.post('/order', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { products, shippingAddress, totalAmount, receiver } = req.body;
    const newOrder = new Order({
      user: req.user._id,
      products,
      shippingAddress,
      totalAmount,
      receiver
    });
    await newOrder.save();

    res.send(newOrder);
  } catch(err) {
    res.status(500).send(err);
  }
});

router.get('/order', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  } catch(err) {
    res.status(500).send(err);
  }
});

// 여기에 더 많은 주문 관련 라우팅을 추가할 수 있습니다.

module.exports = router;
