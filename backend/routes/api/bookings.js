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
  bookingArray.forEach((booking) => {
    console.log(booking.Spot.SpotImages, ` <-----`);
    // booking.Spot.SpotImages.forEach((img) => {
    //   // console.log(img.preview)
    //   if (img.preview) {
    //     // console.log(`this ran`)
    //     booking.Spot.previewImage = img.url;
    //   }
    //   if (!booking.Spot.previewImage) {
    //     booking.Spot.previewImage = "no preview image found";
    //   }
    // });
    // delete booking.SpotImages;
  });
  res.json(bookingArray);
});

module.exports = router;
