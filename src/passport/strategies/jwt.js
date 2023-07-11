const JwtStrategy = require('passport-jwt').Strategy;
const { secret } = require('../../utils/set-user-token');
import dotenv from 'dotenv';
dotenv.config();

const cookieExtractor = req => {
  // req 의 cookies 에서 token 사용하기
  return req.cookies.token
};

const opts = {
  secretOrKey: process.env.JWT_SECRET, //./utils/jwt 의 secret 사용하기
  jwtFromRequest: cookieExtractor,
};

module.exports = new JwtStrategy(opts, (user, done) => {
  done(null, user);
});
