const apiLoginRequired = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: '로그인이 필요합니다' });
    return;
  }
  next();
};
export default apiLoginRequired;