const apiAdminRequired = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ message: '관리자 권한이 필요합니다' });
    return;
  }
  next();
};

export default apiAdminRequired;