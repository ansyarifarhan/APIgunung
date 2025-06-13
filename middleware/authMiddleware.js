module.exports = {
  pastikanTerotentikasi: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Akses ditolak. Silakan login terlebih dahulu.' });
  }
};