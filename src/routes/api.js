const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');

router.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

router.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password }); // 실제 서비스에서는 보안을 위해 비밀번호를 해시화해야 합니다.
    if (user) {
        res.json({
            userId: user._id,
            username: user.username,
            token: 'abc.xyz.123' // 실제 서비스에서는 JWT 등을 이용해 토큰을 생성해야 합니다.
        });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

module.exports = router;
