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

// DELETE a spotImage with imageId
router.delete("/:imageId", requireAuth, async (req, res) => {
  const id = req.params.imageId;
  const { user } = req;
  const currImage = await SpotImage.findOne({
    where: { id },
    include: [{ model: Spot, attributes: ["ownerId"] }],
  });
  // console.log(currImage.Spot.ownerId);
  // console.log(currImage);
  if (!currImage) {
    return res.status(404).json({
      message: "Spot Image couldn't be found",
      statusCode: 404,
    });
  }
  if (user.id !== currImage.Spot.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  } else {
    await currImage.destroy();
    return res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

module.exports = router;
