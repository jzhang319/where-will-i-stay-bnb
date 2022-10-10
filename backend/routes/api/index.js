const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");
const reviewsRouter = require("./reviews.js");
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

// logging in and out , uses sessions
router.use("/session", sessionRouter);

// users sign ups uses /users
router.use("/users", usersRouter);

// spots
router.use("/spots", spotsRouter);

// reviews
router.use("/reviews", reviewsRouter);

// POST /api/test
router.post("/test", (req, res) => {
  res.json({
    requestBody: req.body,
  });
});

// GET /api/set-token-cookie
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition",
    },
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

// GET /api/restore-user
router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

// GET /api/require-auth
const { requireAuth } = require("../../utils/auth.js");
router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
