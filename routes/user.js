//.env에 시크릿키 저장
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

    if (password !== password_confirm) {
      return res.status(400).send("비밀번호가 일치하지 않습니다.");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("이미 존재하는 email 입니다.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // 환경 변수에서 JWT 시크릿키 액세스
    res.send({ token });
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

// session을 쓰지않는 authenticate 를 활용한 프로텍티드 라우터 예시. 이걸로 admin 만들면될듯?
router.get("/secret", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send("여기는 admin 페이지입니다. JWT가 유효해야만 접근할 수 있습니다.");
});

module.exports = router;
