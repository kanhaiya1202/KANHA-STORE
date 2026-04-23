const Product = require("../models/Product");

// ── @GET /api/products  (public) ─────────────────────────────────────────────
const getAllProducts = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, search, sort } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) filter.category = { $regex: category, $options: "i" };
    if (brand)    filter.brand    = { $regex: brand,    $options: "i" };
    if (search)   filter.name     = { $regex: search,   $options: "i" };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Build sort object
    let sortOption = {};
    if (sort === "price_asc")  sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "newest")     sortOption = { createdAt: -1 };

    const products = await Product.find(filter).sort(sortOption);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ── @GET /api/products/:id  (public) ─────────────────────────────────────────
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ── @POST /api/products  (admin only) ────────────────────────────────────────
const createProduct = async (req, res) => {
  try {
    const { name, category, brand, price, stock, description, image } = req.body;

    if (!name || !category || !brand || !price || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const product = await Product.create({
      name, category, brand, price, stock, description, image,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ── @PUT /api/products/:id  (admin only) ─────────────────────────────────────
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ── @DELETE /api/products/:id  (admin only) ──────────────────────────────────
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    // Soft delete — keeps data but hides it from public
    product.isActive = false;
    await product.save();

    res.status(200).json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};