import User from '../models/user';

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user.isAdmin) {
    return res.status(403).json({ message: '관리자 권한이 필요합니다.' });
  }
  next();
};

export default isAdmin;