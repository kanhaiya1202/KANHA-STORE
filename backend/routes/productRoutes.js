const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// ── Public routes ────────────────────────────────────────────────────────
router.get("/",      getAllProducts);   // GET  /api/products
router.get("/:id",   getProductById);  // GET  /api/products/:id

// ── Admin-only routes ─────────────────────────────────────────────────────────
router.post("/",     protect, adminOnly, createProduct);   // POST   /api/products
router.put("/:id",   protect, adminOnly, updateProduct);   // PUT    /api/products/:id
router.delete("/:id",protect, adminOnly, deleteProduct);   // DELETE /api/products/:id

module.exports = router;