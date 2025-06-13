const express = require('express');
const passport = require('passport');
const router = express.Router();

// Rute untuk memulai proses login Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Rute callback setelah login Google berhasil
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api/gunung'); // Arahkan ke daftar gunung setelah login berhasil
  }
);

// Rute untuk logout
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;