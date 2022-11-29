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
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/dfe9fd1e-a010-43c9-b546-0bbc7d59f7f3.jpeg?im_w=720",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-760114730907532478/original/de9e7992-5882-4ab3-bf46-f4a453d2e1c4.jpeg?im_w=720",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-632748513062085543/original/063171ef-9424-483d-b099-6c7ba666e9da.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-715411481162208357/original/a875bbe4-8549-4ba4-abe8-179066c9a9ab.jpeg?im_w=720",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-729597790487190657/original/07c2691a-7a40-4740-bf9b-6e821b52547b.jpeg?im_w=720",
        preview: true,
      },
      // {
      //   spotId: 5,
      //   url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-676499889269811829/original/9d8755ff-32d6-4ba6-bec8-1a82e9cd7f64.jpeg?im_w=720",
      //   preview: true,
      // },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,

      {
        spotId: [2, 3],
      },
      {}
    );
  },
};
