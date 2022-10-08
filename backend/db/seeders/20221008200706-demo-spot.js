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
    return queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "567 Open Road",
        city: "Brooklyn",
        state: "New York",
        country: "United States of America",
        lat: 40.6334395,
        lng: -74.0103148,
        name: "Home Sweet Home",
        description: "This is where you want to be",
        price: 168,
      },
      {
        ownerId: 2,
        address: "1998 Century Street",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 36.7014631,
        lng: -118.755997,
        name: "Tiny Home",
        description: "You will love this home for a vacation",
        price: 99,
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
    return queryInterface.bulkDelete("Spots", {
      name: { [Op.in]: ["Home Sweet Home", "Tiny Home"] },
    });
  },
};