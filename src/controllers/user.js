const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.postJoin = async (req, res) => {
  try {
    const { name, email, password, password_confirm } = req.body;
    if (password !== password_confirm) {
      return res.status(400).send("비밀번호가 일치하지 않습니다.");
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.send({ token });
    } else {
      return res.status(400).json("이미 존재하는 email 입니다.");
    }
  } catch (err) {
    res.status(500).send("회원가입 중 오류가 발생하였습니다.");
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("아이디가 존재하지 않습니다.");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("비밀번호가 틀렸습니다.");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('jwt', token, { httpOnly: false, secure: true})
    res.send({ token });
  } catch (err) {
    res.status(500).send("로그인 중 오류가 발생하였습니다.");
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) throw Error("사용자가 존재하지 않습니다.");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: " 문제가 발생했습니다."});
  }
};

//사용자 정보 수정
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true});
    if (!user) throw Error("사용자가 존재하지 않습니다.");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: " 문제가 발생했습니다. "})
  }
};

//사용자 정보 삭제
exports.deleteUser = async (req, res) =>{
  try {
    const user = await User.findByIdandDelete(req.user.id);
    if (!user) throw Error("사용자가 존재하지 않습니다.");
    res.json({ message: "사용자 삭제가 완료되었습니다."});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: " 문제가 발생했습니다."})
  }
};