const loginRequired = (req, res, next) => {
  if (!req.user) {
    res.redirect('/errorpage');
    return;
  }

  next();
}
export default loginRequired;