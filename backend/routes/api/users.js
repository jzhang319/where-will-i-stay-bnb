const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// middleware to check the keys and validate them
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const checkUsername = await User.findOne({ where: { username } });
  const checkEmail = await User.findOne({ where: { email } });
  // const { user } = req;
  // console.log(user, ` <-----------`)

  if (!firstName || !lastName || !username || !email) {
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        email: "Invalid email",
        username: "Username is required",
        firstName: "First Name is required",
        lastName: "Last Name is required",
      },
    });
  }
  if (checkEmail) {
    return res.status(403).json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that email already exists",
      },
    });
  }

  if (checkUsername) {
    return res.status(403).json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        username: "User with that username already exists",
      },
    });
  }

  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  await setTokenCookie(res, user);

  return res.json(user);
});

//! GET all users for testing
router.get("/", async (req, res) => {
  const allUsers = await User.findAll();

  res.json(allUsers);
});

module.exports = router;
