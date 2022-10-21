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

        reviewId: 1,
        url: "this url.com",
      },
      {

        reviewId: 2,
        url: "whats url.com",
      },
      {

        reviewId: 2,
        url: "oh this url.com",
      },
      {

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
