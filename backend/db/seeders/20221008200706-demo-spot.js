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
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, [
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
        ownerId: 1,
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
      {
        ownerId: 2,
        address: "2451 Next Street",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7790262,
        lng: -122.419906,
        name: "Super Home",
        description: "You will love this home for a vacation",
        price: 190,
      },
      {
        ownerId: 3,
        address: "970 Corner Street",
        city: "El Paso",
        state: "Texas",
        country: "United States of America",
        lat: 31.7865623,
        lng: -106.441207,
        name: "Dry Home",
        description: "Your vacation home",
        price: 78,
      },
      {
        ownerId: 1,
        address: "230 Around Street",
        city: "Manhattan",
        state: "New York",
        country: "United States of America",
        lat: 31.887322,
        lng: -106.441207,
        name: "New Home",
        description: "Your vacation home",
        price: 112,
      },
      {
        ownerId: 2,
        address: "123 What Street",
        city: "Long Island",
        state: "New York",
        country: "United States of America",
        lat: 30.7863423,
        lng: -103.477207,
        name: "What Home!",
        description: "Your dream vacation home!",
        price: 178,
      },
      {
        ownerId: 1,
        address: "6980 Woow Street",
        city: "Boston",
        state: "Massachusetts",
        country: "United States of America",
        lat: 51.7895623,
        lng: -196.442207,
        name: "Super Home",
        description: "More vacation home",
        price: 278,
      },
      {
        ownerId: 3,
        address: "2642 Corner Ave",
        city: "San Diego",
        state: "California",
        country: "United States of America",
        lat: 51.8865623,
        lng: -190.449007,
        name: "Hot Home",
        description: "Your vacation home",
        price: 478,
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
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ["Home Sweet Home", "Tiny Home", "Super Home", "Dry Home"],
      },
    });
  },
};
