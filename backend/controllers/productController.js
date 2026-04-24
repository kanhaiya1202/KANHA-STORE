const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, search, sort } = req.query;
    const filter = { isActive: true };

    if (category) filter.category = { $regex: category, $options: "i" };
    if (brand)    filter.brand    = { $regex: brand,    $options: "i" };
    if (search)   filter.name     = { $regex: search,   $options: "i" };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === "price_asc")  sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "newest")     sortOption = { createdAt: -1 };

    const products = await Product.find(filter).sort(sortOption);
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive)
      return res.status(404).json({ success: false, message: "Product not found." });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, category, brand, price, stock, description, image } = req.body;
    if (!name || !category || !brand || !price || !description)
      return res.status(400).json({ success: false, message: "Please provide all required fields." });
    const product = await Product.create({ name, category, brand, price, stock, description, image });
    res.status(201).json({ success: true, message: "Product created!", product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found." });
    res.status(200).json({ success: true, message: "Product updated!", product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found." });
    product.isActive = false;
    await product.save();
    res.status(200).json({ success: true, message: "Product deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };