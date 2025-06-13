// Menggunakan dotenv untuk memuat variabel lingkungan dari file .env saat di lokal
require('dotenv').config();

module.exports = {
  // Konfigurasi untuk lingkungan Development (lokal)
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  // Konfigurasi untuk lingkungan Production (Railway)
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Port penting untuk Railway
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Diperlukan untuk beberapa koneksi cloud
      }
    }
  }
};