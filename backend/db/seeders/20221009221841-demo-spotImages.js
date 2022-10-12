"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("SpotImages", [
      {
        spotId: 2,
        url: "spotimageurl.com/hello.jgp",
        preview: true,
      },
      {
        spotId: 3,
        url: "thisisntmypage.com/omg.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "wherecanifindit/spotimage.jpg",
        preview: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "SpotImages",
      {
        spotId: [2, 3],
      },
      {}
    );
  },
};
