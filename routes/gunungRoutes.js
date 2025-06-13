const express = require('express');
const router = express.Router();
const multer = require('multer');
const gunungController = require('../controllers/gunungController');
const { pastikanTerotentikasi } = require('../middleware/authMiddleware');

// Konfigurasi Multer untuk menyimpan file di memori (sebagai buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rute Publik (tidak perlu login)
router.get('/', gunungController.getAllGunung);
router.get('/:id', gunungController.getGunungById);

// Rute Terproteksi (wajib login)
router.post('/', pastikanTerotentikasi, upload.single('gambar'), gunungController.createGunung);
router.put('/:id', pastikanTerotentikasi, upload.single('gambar'), gunungController.updateGunung);
router.delete('/:id', pastikanTerotentikasi, gunungController.deleteGunung);

module.exports = router;