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

// DELETE a Review Image by imageId
router.delete("/:imageId", requireAuth, async (req, res) => {
  
});

module.exports = router;
