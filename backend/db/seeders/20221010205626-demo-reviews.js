"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

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
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, "Reviews", [
      {
        userId: 1,
        spotId: 1,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        userId: 2,
        spotId: 1,
        review: "This was a cool spot!",
        stars: 5,
      },
      {
        userId: 3,
        spotId: 2,
        review: "This was a really cool spot!",
        stars: 5,
      },
      {
        userId: 3,
        spotId: 3,
        review: "This was really awesome!",
        stars: 5,
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
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(
      options,
      "Reviews",
      {
        id: [1, 2, 3, 4],
      },
      {}
    );
  },
};
