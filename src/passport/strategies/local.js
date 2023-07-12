import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/user';
import hashPassword from '../../utils/hash-password';

const config = {
  usernameField: 'email',
  passwordField: 'password',
};

const local = new LocalStrategy(config, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('회원을 찾을 수 없습니다.');
    }
    if (user.password !== hashPassword(password)) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    done(null, {
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    done(err, null);
  }
});

export default local;