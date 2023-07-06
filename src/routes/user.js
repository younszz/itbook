require('dotenv').config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const router = express.Router();

// JWT 설정. .env에 저장된 시크릿키를 가져옴
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET // 여기서 환경 변수에서 JWT 시크릿키에 액세스
};

passport.use(new JwtStrategy(options, async (payload, done) => {
  const user = await User.findById(payload.id);

  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));

// 회원가입 경로
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, password_confirm } = req.body;
    //status(400)은 필요정보 누락, 데이터 유효성 검사에 실패한 경우의 상태코드.
    if (password !== password_confirm) {
      return res.status(400).send("비밀번호가 일치하지 않습니다.");
    }

    const existingUser = await User.findOne({ email });
    console.log(JSON.stringify(existingUser));

    // if (existingUser) return res.status(400).send("이미 존재하는 email 입니다.");
    if (!existingUser) {
      //console.log('해당 이메일을 가진 사용자를 찾을 수 없습니다.');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
    
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.send({ token });
    } else {
      return res.status(400).json("이미 존재하는 email 입니다.");
    }
    //status(500)은 서버가 요청을 처리하다가 예상치 못한 에러에 직면했을때 반환되는 상태. try-catch로 잡힌 오류는 500으로 처리했음.
  } catch (err) {
    res.status(500).send("회원가입 중 오류가 발생하였습니다.");
  }
});

// 로그인 경로
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("아이디가 존재하지 않습니다.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("비밀번호가 틀렸습니다.");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // 환경 변수에서 JWT 시크릿키 액세스
    res.send({ token });
  } catch (err) {
    res.status(500).send("로그인 중 오류가 발생하였습니다.");
  }
});


// // Product GET 사용자에게 상품목록을 보여주는 라우터.
// router.get('/products', async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.send(products);
//   } catch(err) {
//     res.status(500).send(err);
//   }
// });

// Category GET 사용자에게 카테고리를 보여주는 라우터.
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch(err) {
    res.status(500).send(err);
  }
});

// Add to cart 로그인한 사용자가 장바구니에 상품을 추가하는 기능. 필요시 추후에 비로그인 사용자도 가능하도록 수정가능.
router.post('/cart', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).send({ message: "상품을 찾을 수 없습니다." });
    }

    user.cart.push(product);
    await user.save();
    
    res.send({ message: "상품이 장바구니에 추가되었습니다." });
  } catch (err) {
    res.status(500).send(err);
  }
});


// 로그아웃
router.post("/logout", passport.authenticate('jwt', { session: false }), (req, res) => {
  req.logout();
  res.send({ message: '로그아웃되었습니다.' });
});

// 사용자 정보 조회
router.get("/profile", passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).send("유저를 찾을 수 없습니다.");
    res.send(user);
  } catch (err) {
    res.status(500).send("사용자 정보 조회 중 오류가 발생하였습니다.");
  }
});

// 사용자 정보 수정
router.put("/profile", passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { name, email, password, newPassword, newEmail } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send("유저를 찾을 수 없습니다.");

    if (email !== user.email) {
      return res.status(400).send("현재 이메일이 일치하지 않습니다.");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("비밀번호가 틀렸습니다.");

    if (newPassword) {
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (newEmail) {
      const existingUser = await User.findOne({ email: newEmail });
      if (existingUser) return res.status(400).send("이미 존재하는 email 입니다.");
      user.email = newEmail;
    }

    if (name) {
      user.name = name;
    }

    await user.save();

    res.send({ message: "사용자 정보가 수정되었습니다." });
  } catch (err) {
    res.status(500).send("사용자 정보 수정 중 오류가 발생하였습니다.");
  }
});

// 사용자 정보 삭제
router.delete("/profile", passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send("유저를 찾을 수 없습니다.");

    if (email !== user.email) {
      return res.status(400).send("현재 이메일이 일치하지 않습니다.");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("비밀번호가 틀렸습니다.");

    await user.remove();
    res.send({ message: "계정이 삭제되었습니다." });
  } catch (err) {
    res.status(500).send("사용자 정보 삭제 중 오류가 발생하였습니다.");
  }
});


// session을 쓰지않는 authenticate 를 활용한 프로텍티드 라우터 예시. 이걸로 admin 만들면될듯?
// router.get("/secret", passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.send("여기는 admin 페이지입니다. JWT가 유효해야만 접근할 수 있습니다.");
// });

module.exports = router;
