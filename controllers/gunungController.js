const Gunung = require('../models/gunung');

// Mendapatkan semua data gunung
exports.getAllGunung = async (req, res) => {
  try {
    const dataGunung = await Gunung.findAll({ attributes: ['id', 'nama', 'ketinggian'] }); // Tidak mengirim gambar di list
    res.json(dataGunung);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan satu gunung (termasuk gambar)
exports.getGunungById = async (req, res) => {
    try {
        const gunung = await Gunung.findByPk(req.params.id);
        if (gunung) {
            res.json(gunung);
        } else {
            res.status(404).json({ message: 'Gunung tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Menambah data gunung baru
exports.createGunung = async (req, res) => {
  const { nama, ketinggian } = req.body;
  const gambar = req.file ? req.file.buffer : null;

  try {
    const gunungBaru = await Gunung.create({ nama, ketinggian, gambar });
    res.status(201).json({ message: "Gunung berhasil ditambahkan", data: gunungBaru });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Memperbarui data gunung
exports.updateGunung = async (req, res) => {
    const { nama, ketinggian } = req.body;
    const gambar = req.file ? req.file.buffer : null;

    try {
        const gunung = await Gunung.findByPk(req.params.id);
        if (!gunung) {
            return res.status(404).json({ message: 'Gunung tidak ditemukan' });
        }
        
        gunung.nama = nama || gunung.nama;
        gunung.ketinggian = ketinggian || gunung.ketinggian;
        if (gambar) gunung.gambar = gambar;

        await gunung.save();
        res.json({ message: "Data gunung berhasil diperbarui", data: gunung });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus data gunung
exports.deleteGunung = async (req, res) => {
    try {
        const gunung = await Gunung.findByPk(req.params.id);
        if (!gunung) {
            return res.status(404).json({ message: 'Gunung tidak ditemukan' });
        }
        
        await gunung.destroy();
        res.json({ message: 'Gunung berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};