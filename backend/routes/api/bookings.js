const express = require("express");
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
        include: [
          {
            model: SpotImage,
            where: { preview: true },
            attribute: ["url"],
          },
        ],
      },
    ],
  });
  // console.log(currBookings);
  let bookingArray = [];
  currBookings.forEach((booking) => {
    bookingArray.push(booking.toJSON());
  });
  console.log(bookingArray);
  res.json(bookingArray);
});

// GET get all current User's booking
router.get("/bookings/current", requireAuth, async (req, res) => {
  const { user } = req;
  const currUserBookings = await Booking.findAll({
    where: { userId: user },
    include: [{ model: Spot }, { model: SpotImage, attributes: ["url"] }],
  });

  
});

module.exports = router;
