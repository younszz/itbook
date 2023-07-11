module.exports = (req, res, next) => {
  if (!req.user) {
    res.redirect('/errorpage');
    return;
  }

  next();
}