const adminRequired = (req, res, next) => {
  if (!req.user) {
    res.redirect('/errorpage');
    return;
  }
  
  if (!req.user.isAdmin) {
    res.redirect('/errorpage');
    return;
  }
  next();
};

export default adminRequired;
