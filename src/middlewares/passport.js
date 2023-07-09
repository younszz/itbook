import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';

dotenv.config();

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
