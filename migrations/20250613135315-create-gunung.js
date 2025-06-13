'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Fungsi `up` dijalankan saat kita melakukan migrasi (db:migrate).
   * Ini berisi instruksi untuk MEMBUAT perubahan.
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Gunungs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ketinggian: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      gambar: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  /**
   * Fungsi `down` dijalankan saat kita membatalkan migrasi (db:migrate:undo).
   * Ini berisi instruksi untuk MENGEMBALIKAN perubahan.
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Gunungs');
  }
};