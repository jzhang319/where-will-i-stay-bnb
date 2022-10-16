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
const { Op } = require("sequelize");

// DELETE deletes an existing spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const id = req.params.spotId;
  let currSpot = await Spot.findOne({ where: { id } });
  if (!currSpot) {
    res.status(404).json({
      message: "Spot not found",
      statusCode: 404,
    });
  }
  if (req.user.id === currSpot.ownerId) {
    await Spot.destroy({ where: { id } });
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
  if (
    !address ||
    !city ||
    !state ||
    !country ||
    !lat ||
    !lng ||
    !name ||
    !description ||
    !price
  ) {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
        city: "City is required",
        state: "State is required",
        country: "Country is required",
        lat: "Latitude is not valid",
        lng: "Longitude is not valid",
        name: "Name must be less than 50 characters",
        description: "Description is required",
        price: "Price per day is required",
      },
    });
  }

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
    include: [
      { model: SpotImage, attributes: ["url"] },
      { model: Review, attributes: ["stars"] },
    ],
  });
  // console.log(spotOwner, ` --------`);
  let spotArray = [];
  ownerSpots.forEach((spot) => {
    spotArray.push(spot.toJSON());
  });
  spotArray.forEach((spot) => {
    let totalStars = 0;
    spot.Reviews.forEach((el) => {
      totalStars += el.stars;
    });
    spot.numReviews = spot.Reviews.length;
    spot.avgRating = totalStars / spot.Reviews.length;
    spot.SpotImages.forEach((img) => {
      if (img.url) {
        spot.previewImage = img.url;
      }
    });
    if (!spot.previewImage) {
      spot.previewImage = `no preview image found`;
    }
    delete spot.SpotImages;
    delete spot.Reviews;
  });
  res.json(spotArray);
});

// GET all spots
router.get("/", async (req, res) => {
  let { page, size } = req.query;
  // console.log(size, ` <--- size (limit)`);
  // console.log(page, ` <--- page (offset)`);
  //! not actual numbers
  page = Number(page);
  size = Number(size);
  if (Number.isNaN(page)) {
    page = 1;
  }
  if (Number.isNaN(size)) {
    size = 20;
  }
  let limit;
  let offset;

  if (page === 0) {
    page = null;
    size = null;
  } else if (page > 10) {
    page = 10;
  } else if (size > 20) {
    size = 20;
  } else {
    limit = size;
    offset = size * (page - 1);
  }

  const allSpots = await Spot.findAll({
    order: ["id"],
    include: [
      { model: SpotImage },
      { model: User },
      { model: Review, attributes: ["spotId", "stars"] },
    ],
    limit: limit,
    offset: offset,
  });

  let spotArray = [];
  allSpots.forEach((spot) => {
    spotArray.push(spot.toJSON());
  });
  spotArray.forEach((spot) => {
    let totalStars = 0;
    spot.Reviews.forEach((el) => {
      totalStars += el.stars;
    });
    spot.numReviews = spot.Reviews.length;
    spot.avgRating = totalStars / spot.Reviews.length;
    delete spot.User;
    delete spot.Reviews;
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
  res.json({
    Spots: spotArray,
    page: page,
    size: size,
  });
});

// POST create a Booking from a Spot based on Spot id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const id = req.params.spotId;
  const { startDate, endDate } = req.body;
  // console.log(req.body, ` <-------`);
  const currSpot = await Spot.findByPk(id, {
    include: [{ model: Booking }],
  });
  const { user } = req;
  // console.log(currSpot.ownerId, ` <-------`);
  const checkDate = await Booking.findAll({
    where: {
      spotId: id,
    },
  });
  if (!currSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  // console.log(checkDate.length, ` <-------`);

  if (checkDate.length > 0 || checkDate.startDate === startDate) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }
  if (endDate < startDate) {
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }
  if (user.id === currSpot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else {
    const newBooking = await Booking.create({
      spotId: id,
      userId: user.id,
      startDate,
      endDate,
    });
    res.json(newBooking);
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
  let obj = newSpotImage.toJSON();
  delete obj.spotId;
  delete obj.createdAt;
  delete obj.updatedAt;
  res.json(obj);
});

// GET all Bookings with spotID
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const id = req.params.spotId;
  const { user } = req;
  const allBookings = await Booking.findAll({
    where: { spotId: id },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: Spot, attributes: ["ownerId"] },
    ],
  });
  // console.log(allBookings, ` <-------`);
  let bookingArray = [];
  allBookings.forEach((el) => {
    bookingArray.push(el.toJSON());
  });
  let ownerIdnum;
  let ownerArray = [];
  let nonOwnerArray = [];
  for (let i = 0; i < bookingArray.length; i++) {
    let currBooking = bookingArray[i];
    // console.log(currBooking.Spot.ownerId);
    ownerIdnum = currBooking.Spot.ownerId;
    if (currBooking.Spot.ownerId === user.id) {
      // console.log(currBooking.Spot.ownerId);
      delete currBooking.Spot;
      ownerArray.push(currBooking);
    } else {
      delete currBooking.User;
      delete currBooking.Spot;
      delete currBooking.userId;
      delete currBooking.id;
      delete currBooking.createdAt;
      delete currBooking.updatedAt;
      nonOwnerArray.push(currBooking);
    }
  }

  // console.log(allBookings, ` <-------`);
  // console.log(ownerIdnum, ` <-------`);
  // console.log(ownerArray);
  if (!ownerArray.length && !nonOwnerArray.length) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (user.id !== ownerIdnum) {
    return res.json({
      Bookings: nonOwnerArray,
    });
  } else {
    return res.json({
      Bookings: ownerArray,
    });
  }
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
    res.json({
      Reviews: currSpot,
    });
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
  const currSpot = await Spot.findOne({
    where: { id },
    include: [{ model: SpotImage }, { model: User }, { model: Review }],
  });
  if (!currSpot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  let spotArray = currSpot.toJSON();
  let totalStars = 0;
  for (let i = 0; i < spotArray.Reviews.length; i++) {
    let currReview = spotArray.Reviews[i];
    totalStars += currReview.stars;
  }

  spotArray.numReviews = spotArray.Reviews.length;
  let avgRatingCalc = totalStars / spotArray.Reviews.length;
  spotArray.avgRating = avgRatingCalc;
  if (!spotArray.avgRating) {
    spotArray.avgRating = 0;
  }
  spotArray.Owner = spotArray.User;
  delete spotArray.User;
  delete spotArray.Reviews;

  res.json(spotArray);
});

module.exports = router;
