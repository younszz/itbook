import setUserToken from '../utils/set-user-token';
import hashPassword from '../utils/hash-password';
import User from '../models/user';

export const postLogin = (req, res) => {
  setUserToken(res, req.user);
  res.redirect('/');
};

export const postJoin = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await User.findOne({ email });
    const hashedPassword = hashPassword(password);

    if (!existingUser) {
      const user = await User.create({
        email,
        name,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.send({ token });
    } else {
      return res.status(400).json('이미 존재하는 email 입니다.');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('회원가입 중 오류가 발생했습니다.');
  }
};
