const express = require("express");
const { DATE } = require("sequelize");
const {
  Spot,
  SpotImage,
  User,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth.js");
const router = express.Router();

// GET all of current User's bookings
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const currBookings = await Booking.findAll({
    where: { userId: user.id },
    include: [
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        include: {
          model: SpotImage,
        },
      },
    ],
  });
  // console.log(currBookings);
  let bookingArray = [];
  currBookings.forEach((booking) => {
    bookingArray.push(booking.toJSON());
  });
  // console.log(bookingArray);
  bookingArray.forEach((booking) => {
    // console.log(booking.Spot.SpotImages, ` <-----`);
    booking.Spot.previewImage = "no preview image found";
    booking.Spot.SpotImages.forEach((img) => {
      // console.log(img.preview)
      if (img.preview) {
        // console.log(`this ran`)
        booking.Spot.previewImage = img.url;
      }
    });
    delete booking.Spot.SpotImages;
  });
  res.json(bookingArray);
});

// PUT update existing Booking
router.put("/:bookingId", requireAuth, async (req, res) => {
  const id = req.params.bookingId;
  const { user } = req;
  const { startDate, endDate } = req.body;

  const currBooking = await Booking.findOne({
    where: { id },
    include: [{ model: Spot, attributes: ["ownerId"] }],
  });
  if (!currBooking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  let ownerIdnum;
  let bookingObj = currBooking.toJSON();
  // console.log(bookingObj);
  ownerIdnum = bookingObj.Spot.ownerId;
  // console.log(ownerIdnum);
  if (endDate < startDate) {
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot come before startDate",
      },
    });
  }
  if (user.id !== ownerIdnum) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else {
    currBooking.set({
      startDate,
      endDate,
    });
    await currBooking.save();
    // console.log(currBooking.Spot, ` <-------`);
    let obj = currBooking.toJSON();
    delete obj.Spot;
    res.json(obj);
  }
});

// DELETE a Booking with bookingId
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const id = req.params.bookingId;
  const { user } = req;
  const currBooking = await Booking.findOne({
    where: { id },
    include: [{ model: Spot, attributes: ["ownerId"] }],
  });
  // console.log(user.id);
  if (!currBooking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  const date = new Date();
  // console.log(date, ` <-------`);
  if (currBooking.startDate < date) {
    return res.status(403).json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403,
    });
  }
  // console.log(currBooking.userId, ` <-------`);
  if (currBooking.Spot.ownerId === user.id || currBooking.userId === user.id) {
    currBooking.destroy();
    return res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

module.exports = router;
