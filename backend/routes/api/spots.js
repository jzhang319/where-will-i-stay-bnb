const express = require("express");
const { Spot, SpotImage, User } = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth.js");
const router = express.Router();

// GET current user
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
