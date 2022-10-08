const express = require("express");
const { Spot, spotImage } = require("../../db/models");
const router = express.Router();

//! GET all spots for testing
router.get("/", async (req, res) => {
  const allSpots = await Spot.findAll({ include: spotImage });

  res.json(allSpots);
});

module.exports = router;
