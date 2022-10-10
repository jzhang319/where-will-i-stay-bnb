const express = require("express");
const {
  Spot,
  SpotImage,
  User,
  Review,
  ReviewImage,
} = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth.js");
const router = express.Router();

// GET all reviews of current user
router.get("/current", restoreUser, async (req, res) => {
  const { user } = req;
  const spotReviews = await Review.findAll({
    where: { userId: user.id },
    include: [User],
  });
  if (spotReviews.length === 0) {
    res.status(404).json({
      message: "This user has no reviews",
      statusCode: 404,
    });
  } else {
    res.json(spotReviews);
  }
});

module.exports = router;
