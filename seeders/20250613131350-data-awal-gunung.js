'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Gunungs', [
      // Data pertama
      {
        nama: 'Gunung Rinjani',
        ketinggian: 3726,
        gambar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Gunung_Rinjani_from_Gili_Air.JPG/1280px-Gunung_Rinjani_from_Gili_Air.JPG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Data kedua
      {
        nama: 'Gunung Semeru',
        ketinggian: 3676,
        gambar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mahameru_as_seen_from_Mount_Bromo.jpg/1280px-Mahameru_as_seen_from_Mount_Bromo.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Gunungs', null, {});
  }
};