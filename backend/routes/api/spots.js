const express = require("express");
const { Spot, spotImage } = require("../../db/models");
const { User } = require("../../db/models");
const { requireAuth, restoreUser } = require("../../utils/auth.js");
const router = express.Router();

// GET current user
router.get("/current", restoreUser, async (req, res) => {
  const { user } = req;
  // console.log(user.id, `-----------------------`);
  const currUser = await User.findByPk(user.id);
  // console.log(currUser, ` -------------------`);
  res.json(currUser);
});

// GET all spots
router.get("/", async (req, res) => {
  const allSpots = await Spot.findAll({ include: spotImage });

  res.json(allSpots);
});

module.exports = router;
