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
    return queryInterface.bulkInsert("ReviewImages", [
      {
        id: 1,
        reviewId: 1,
        url: "this url.com",
      },
      {
        id: 2,
        reviewId: 2,
        url: "whats url.com",
      },
      {
        id: 3,
        reviewId: 2,
        url: "oh this url.com",
      },
      {
        id: 4,
        reviewId: 3,
        url: "i see this url.com",
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
    return queryInterface.bulkDelete(
      "ReviewImages",
      {
        id: [1, 2, 3, 4],
      },
      {}
    );
  },
};
