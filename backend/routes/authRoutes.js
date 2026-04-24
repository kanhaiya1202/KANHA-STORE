const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// ── Validation rules ──────────────────────────────────────────────────────────
const registerValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email")
    .trim()
    .isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
  body("email").trim().isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// ── Routes ────────────────────────────────────────────────────────────────────

// POST /api/auth/register
router.post("/register", registerValidation, registerUser);

// POST /api/auth/login
router.post("/login", loginValidation, loginUser);

// GET  /api/auth/me  (protected)
router.get("/me", protect, getMe);

// PUT  /api/auth/update-profile  (protected)
router.put("/update-profile", protect, updateProfile);

// PUT  /api/auth/change-password  (protected)
router.put("/change-password", protect, changePassword);

module.exports = router;