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

// DELETE deletes an existing spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const id = req.params.spotId;
  let currSpot = await Spot.findAll({ where: { id } });
  if (currSpot.length === 0) {
    res.status(404).json({
      message: "Spot not found",
      statusCode: 404,
    });
  }
  if (req.user.id === currSpot[0].ownerId) {
    await Spot.destroy({ where: { id: id } });
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// PUT edit a spot with spotID
router.put("/:spotId", requireAuth, async (req, res) => {
  const id = req.params.spotId;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  let currSpot = await Spot.findOne({ where: { id } });
  // console.log(currSpot, ` ----------------`);
  if (!currSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  // console.log(req.user.id, ` ---user id`);
  // console.log(currSpot[0].ownerId, ` ---currSpot`);
  if (req.user.id === currSpot.ownerId) {
    currSpot.set({
      id,
      ownerId: req.user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    await currSpot.save();
    res.json(currSpot);
  } else {
    res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// POST create Spot
router.post("/", requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  // console.log(req)
  // console.log(req.user.id, ` --------------------`);
  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  const checkNewSpot = await Spot.findAll({
    where: { address: newSpot.address },
  });
  if (
    checkNewSpot.address === newSpot.address &&
    checkNewSpot.city === newSpot.city &&
    checkNewSpot.state === newSpot.state
  ) {
    res.status(403).json({
      message: `Address already exists`,
      statusCode: 403,
    });
  } else {
    res.status(201).json(newSpot);
  }
});

// GET Spots owned by current user
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  // console.log(user.id, `-----------------------`);
  // const currUser = await User.findByPk(user.id);

  // console.log(currUser, ` -------------------`);
  const ownerSpots = await Spot.findAll({
    where: { ownerId: user.id },
    include: [{ model: SpotImage, attributes: ["url"] }],
  });
  // console.log(spotOwner, ` --------`);
  let spotArray = [];
  ownerSpots.forEach((spot) => {
    spotArray.push(spot.toJSON());
  });
  spotArray.forEach((spot) => {
    spot.SpotImages.forEach((img) => {
      if (img.url) {
        spot.previewImage = img.url;
      }
    });
    if (!spot.previewImage) {
      spot.previewImage = `no preview image found`;
    }
    delete spot.SpotImages;
  });
  res.json(spotArray);
});

// GET all spots
router.get("/", async (req, res) => {
  const allSpots = await Spot.findAll({
    include: [{ model: SpotImage }],
  });

  let spotArray = [];
  allSpots.forEach((spot) => {
    spotArray.push(spot.toJSON());
  });

  spotArray.forEach((spot) => {
    spot.SpotImages.forEach((img) => {
      // console.log(img.url, ` <-----`);
      if (img.url) {
        // console.log(img, ` <----`);
        spot.previewImage = img.url;
      }
    });
    if (!spot.previewImage) {
      spot.previewImage = `no preview image found`;
    }
    delete spot.SpotImages;
  });
  // console.log(spotArray);
  res.json(spotArray);
});

// POST create a Booking from a Spot based on Spot id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const id = req.params.spotId;
  const currSpot = await Spot.findByPk(id);
  const { user } = req;
  // console.log(currSpot.ownerId);
  if (!currSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (user.id === currSpot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// POST Add an Image to Spot based on spotId
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const { user } = req;
  // console.log(spotId, ` ------------------`);
  const currSpot = await Spot.findOne({ where: { id: spotId } });
  // console.log(currSpot, ` ----------------`);
  // console.log(currSpot.ownerId);
  // console.log(user.id);
  if (!currSpot) {
    return res.status(404).json({
      message: `Spot couldn't be found`,
      statusCode: 404,
    });
  }

  if (user.id !== currSpot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  const newSpotImage = await SpotImage.create({
    spotId,
    url,
    preview,
  });

  res.json(newSpotImage);
});

// GET all reviews by spotId
router.get("/:spotId/reviews", async (req, res) => {
  const id = req.params.spotId;
  // console.log(id, ` <-----`);
  const currSpot = await Review.findAll({
    where: { spotId: id },
    include: [
      {
        model: User,
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  if (currSpot.length === 0) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  } else {
    res.json(currSpot);
  }
});

// POST create a review based on spotId
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  const id = req.params.spotId;
  const { user } = req;
  const currSpot = await Spot.findAll({ where: { id: id } });
  const currReview = await Review.findAll({ where: { userId: user.id } });
  // console.log(currSpot, ` <-------------`);
  if (currSpot.length === 0) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (currReview.length > 0) {
    return res.status(403).json({
      message: "User already has a review for this spot",
      statusCode: 403,
    });
  }

  if (!req.body.review || !req.body.stars) {
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        review: "Review text is required",
        stars: "Stars must be an integer from 1 to 5",
      },
    });
  }
  const currUserReviews = await Review.create({
    userId: user.id,
    spotId: id,
    review: req.body.review,
    stars: req.body.stars,
  });
  res.status(201).json(currUserReviews);
});

// GET detail of Spot from spotId
router.get("/:spotId", async (req, res, next) => {
  const id = req.params.spotId;
  const currSpot = await Spot.findAll({
    where: { id },
    include: [{ model: SpotImage }, { model: User }],
  });
  // console.log(currSpot, ` ----------------`);
  let spotArray = [];
  currSpot.forEach((spot) => {
    spotArray.push(spot.toJSON());
  });

  spotArray.forEach((spot) => {
    // console.log(spot, ` <-------`);
    spot.Owner = spot.User;
    delete spot.User;
  });

  if (currSpot.length === 0) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  } else {
    res.json(spotArray);
  }
});

module.exports = router;
