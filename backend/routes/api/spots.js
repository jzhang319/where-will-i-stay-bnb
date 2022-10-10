const express = require("express");
const { Spot, SpotImage, User, Review } = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth.js");
const router = express.Router();

// DELETE deletes an existing spot
router.delete("/:spotId", restoreUser, async (req, res) => {
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
    res.status(404).json({
      message: "You are not the owner of this spot",
      statusCode: 404,
    });
  }
});

// PUT edit a spot with spotID
router.put("/:spotId", restoreUser, async (req, res) => {
  const id = req.params.spotId;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  let currSpot = await Spot.findAll({ where: { id } });
  // console.log(currSpot, ` ----------------`);
  if (currSpot.length === 0) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  // console.log(req.user.id, ` ---user id`);
  // console.log(currSpot[0].ownerId, ` ---currSpot`);
  if (req.user.id === currSpot[0].ownerId) {
    currSpot = {
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
    };
    res.json(currSpot);
  } else {
    res.status(404).json({
      message: "You are not the owner of the spot",
      statusCode: 404,
    });
  }
});

// POST create Spot
router.post("/", restoreUser, async (req, res) => {
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
router.get("/current", restoreUser, async (req, res) => {
  const { user } = req;
  // console.log(user.id, `-----------------------`);
  // const currUser = await User.findByPk(user.id);

  // console.log(currUser, ` -------------------`);
  const ownerSpots = await Spot.findAll({
    where: { ownerId: user.id },
    // include: [User],
  });
  // console.log(spotOwner, ` ----------------`);
  res.json(ownerSpots);
});

// GET all spots
router.get("/", async (req, res) => {
  const allSpots = await Spot.findAll({ include: SpotImage });

  res.json(allSpots);
});

// POST Add an Image to Spot based on spotId
router.post("/:spotId/images", restoreUser, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  // console.log(spotId, ` ------------------`);
  const currSpot = await Spot.findAll({ where: { id: spotId } });
  console.log(currSpot, ` ----------------`);
  const newSpotImage = await SpotImage.create({
    spotId,
    url,
    preview,
  });
  if (currSpot.length === 0) {
    res.status(404).json({
      message: `Spot couldn't be found`,
      statusCode: 404,
    });
  } else {
    res.json(newSpotImage);
  }
});

// GET all reviews by spotId
router.get("/:spotId/reviews", async (req, res) => {
  const id = req.params.spotId;
  const currSpot = await Review.findAll({
    where: { spotId: id },
    include: [User],
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

// GET detail of Spot from spotId
router.get("/:spotId", async (req, res, next) => {
  const id = req.params.spotId;
  const currSpot = await Spot.findAll({
    where: { id },
    include: [SpotImage, User],
  });
  // console.log(currSpot, ` ----------------`);
  if (currSpot.length === 0) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  } else {
    res.json(currSpot);
  }
});

module.exports = router;
