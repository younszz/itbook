import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const postJoin = async (req, res) => {
  try {
    const { name, email, password, password_confirm } = req.body;
    if (password !== password_confirm) {
      return res.status(400).send('비밀번호가 일치하지 않습니다.');
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.send({ token });
    } else {
      return res.status(400).json('이미 존재하는 email 입니다.');
    }
  } catch (err) {
    res.status(500).send('회원가입 중 오류가 발생하였습니다.');
  }
};

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('아이디가 존재하지 않습니다.');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('비밀번호가 틀렸습니다.');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('jwt', token, { httpOnly: false, secure: true });
    res.send({ token });
  } catch (err) {
    res.status(500).send('로그인 중 오류가 발생하였습니다.');
  }
};
