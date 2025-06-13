const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const gunungRoutes = require('./routes/gunungRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Konfigurasi Sesi
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } // `true` jika di production (HTTPS)
}));

// Inisialisasi Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    // Di sini Anda bisa menyimpan data `profile` ke database user jika diperlukan
    return done(null, profile);
  }
));

// Rute
app.use('/auth', authRoutes);
app.use('/api/gunung', gunungRoutes);

// Halaman utama
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`<h1>Selamat Datang, ${req.user.displayName}</h1><a href="/auth/logout">Logout</a><br><br><a href="/api/gunung">Lihat Daftar Gunung</a>`);
    } else {
        res.send('<h1>Selamat Datang di API Gunung</h1><a href="/auth/google">Login dengan Google</a>');
    }
});

// Sinkronisasi database dan jalankan server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}).catch(err => {
    console.error('Gagal terhubung ke database:', err);
});