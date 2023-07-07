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
router.post("/api/join", async (req, res) => {
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
router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("아이디가 존재하지 않습니다.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("비밀번호가 틀렸습니다.");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // 환경 변수에서 JWT 시크릿키 액세스
    res.cookie('jwt', token, { httpOnly: false, secure: true})

    res.send({ token });
  } catch (err) {
    res.status(500).send("로그인 중 오류가 발생하였습니다.");
  }
});

module.exports = router;
