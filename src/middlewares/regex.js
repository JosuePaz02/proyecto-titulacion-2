const { body, validationResult } = require("express-validator");

const validateRegex = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .matches(/^[a-zA-Z]+$/),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .matches(/^[a-zA-Z]+$/),
  body("tel_area")
    .trim()
    .notEmpty()
    .withMessage("Telephone area is required")
    .matches(/^\+\d{1,3}$/),
  body("tel_number")
    .trim()
    .notEmpty()
    .withMessage("Telephone number is required")
    .matches(/^\d{10}$/)
    .withMessage("Telephone number is invalid"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .withMessage("Email must be a valid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^[@#$%^&*!_+()\[\]{};':"\\|,.<>?A-Za-z0-9]{7,}$/)
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {validateRegex}
