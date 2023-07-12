import passport from 'passport';
import local from './strategies/local';
import jwt from './strategies/jwt';

export default () => {
  passport.use(local);
  // jwt strategy 사용
  passport.use(jwt);
};
