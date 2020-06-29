const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Input correct email")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("This email is already taken");
        }
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail(),
  body("password", "Password must be minimum 6 symbols")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    })
    .trim(),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be minimum 3 symbols")
    .trim(),
];

exports.loginValidators = [
  body("email")
    .isEmail()
    .withMessage("Input correct email")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject("Such user doesn't exist");
        }
        return true;
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail(),
  body("password", "Password must be minimum 6 symbols")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
          const areSame = await bcrypt.compare(value, user.password);
          if (!areSame) {
            return Promise.reject("Wrong password!");
          }
        }
      } catch (e) {
        console.log(e);
      }
    })
    .trim(),
];

exports.courseValidators = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Name of course must be more 2 symbols")
    .trim(),
  body("price").isNumeric().withMessage("You can input only numbers for price"),
  body("img", "To input correct url image").isURL(),
];
