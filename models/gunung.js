const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gunung = sequelize.define('Gunung', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ketinggian: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gambar: {
    type: DataTypes.STRING, // Menyimpan data gambar sebagai Binary Large Object
    allowNull: true,
  },
});

module.exports = Gunung;