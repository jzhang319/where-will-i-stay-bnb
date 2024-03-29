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

// DELETE a review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const id = req.params.reviewId;
  const currReview = await Review.findByPk(id);
  // console.log(currReview);
  const { user } = req;
  // console.log(user.id);
  // console.log(currReview.userId);
  if (!currReview) {
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
  } else {
    await currReview.destroy();
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

// POST create image for a review by reviewID
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const id = req.params.reviewId;
  const { user } = req;
  // console.log(id, user, ` <-----------`);

  const currReview = await Review.findOne({
    where: { id },
  });
  // console.log(currReview[0].userId, ` <-----------`);
  if (!currReview) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (currReview.userId !== user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  // console.log(user.id, ` <-----------`);

  const numReviewImages = await ReviewImage.findAll({
    where: { reviewId: id },
  });
  // console.log(numReviews.length, ` <---------`);
  if (numReviewImages.length > 9) {
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
  let imageObj = newReviewImage.toJSON();
  delete imageObj.reviewId;
  delete imageObj.updatedAt;
  delete imageObj.createdAt;
  res.status(200).json(imageObj);
});

// GET all reviews of current user
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  // console.log(user, ' <------ req object');

  const userReviews = await Review.findAll({
    where: { userId: user.id },
    include: [
      { model: User },
      {
        model: Spot,
        include: [
          { model: SpotImage, attributes: ["url"], where: { preview: true } },
        ],
      },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });

  // console.log(userReviews, ` <----------- userReviews`);
  // changed from (userReviews.length === 0)
  if (!userReviews) {
    return res.status(404).json({
      message: "This user has no reviews",
      statusCode: 404,
    });
  }

  let reviewArray = [];
  userReviews.forEach((review) => {
    reviewArray.push(review.toJSON());
  });
  // console.log(reviewArray, ` <----------- reviewArray`);
  reviewArray.forEach((review) => {
    // console.log(review.Spot.SpotImages[0].url, ` <-----------`);
    if (review.Spot.SpotImages[0]) {
      review.Spot.previewImage = review.Spot.SpotImages[0].url;
    } else {
      review.Spot.previewImage = [];
    }
    // console.log(review.Spot, ` <-----`);
    delete review.Spot.SpotImages;
  });
  return res.json({
    Reviews: userReviews,
  });
  // return res.json({
  //   Reviews: reviewArray,
  // });
});

// PUT edit a review
router.put("/:reviewId", requireAuth, async (req, res) => {
  const { user } = req;
  const reviewId = req.params.reviewId;
  const { review, stars } = req.body;
  const currReview = await Review.findOne({ where: { id: reviewId } });
  // console.log(currReview.userId, ` <-----------`);
  // console.log(user, ` <---------`);
  if (!currReview) {
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
  currReview.set({
    review,
    stars,
  });
  await currReview.save();
  res.status(200).json(currReview);
});

module.exports = router;
