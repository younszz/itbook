import User from '../models/user';

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) throw Error('사용자가 존재하지 않습니다.');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다.' });
  }
};

//사용자 정보 수정
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    if (!user) throw Error('사용자가 존재하지 않습니다.');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다. ' });
  }
};

//사용자 정보 삭제
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdandDelete(req.user.id);
    if (!user) throw Error('사용자가 존재하지 않습니다.');
    res.json({ message: '사용자 삭제가 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' 문제가 발생했습니다.' });
  }
};
