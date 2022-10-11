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

// POST create image for a review by reviewID
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const id = req.params.reviewId;
  const currReview = await Review.findAll({
    where: { id: id },
  });
  if (currReview.length === 0) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  if (currReview.length > 9) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403,
    });
  }
  // console.log(currReview, ` <-----------`);
  // console.log(req.body.url, ` <-----------`);
  const newReviewImage = await ReviewImage.create({
    reviewId: id,
    url: req.body.url,
  });
  res.status(200).json(newReviewImage);
});

// GET all reviews of current user
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  // console.log(user);

  const userReviews = await Review.findAll({
    where: { userId: user.id },
    include: [{ model: User }, { model: Spot }, { model: ReviewImage }],
  });

  console.log(userReviews, ` <-----------`);

  if (userReviews.length === 0) {
    return res.status(404).json({
      message: "This user has no reviews",
      statusCode: 404,
    });
  }
  res.json(userReviews);
});

// PUT edit a review
router.put("/:reviewId", requireAuth, async (req, res) => {
  const { user } = req;
  const reviewId = req.params.reviewId;
  const { id, userId, spotId, review, stars } = req.body;
  const currReview = await Review.findOne({ where: { id: reviewId } });
  // console.log(currReview.userId, ` <-----------`);
  if (!currReview){
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (user.id !== currReview.userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  if (!review || !stars) {
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        review: "Review text is required",
        stars: "Stars must be an integer from 1 to 5",
      },
    });
  }
  let updateReview = {
    id,
    userId,
    spotId,
    review,
    stars,
  };
  res.status(200).json(updateReview);
});

module.exports = router;
