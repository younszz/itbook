import User from '../models/user';

module.exports = async (req, res, next) => {
  // if (!req.isAuth) {
  //   return res.status(401).json({ message: '인증되지 않았습니다.' });
  // }

  const user = await User.findById(req.userId);
  if (!user.isAdmin) {
    return res.status(403).json({ message: '관리자 권한이 필요합니다.' });
  }

  next();
};