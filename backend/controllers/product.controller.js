import { Product } from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    const createdBy = req.user._id;

    // Validate required fields
    if (!name || !price || !image || !description) {
      return res.status(400).json({
        message: "Something is missing for adding product",
        success: false,
      });
    }

    // Check if same product already added by same admin
    const existingProduct = await Product.findOne({ name, createdBy });
    if (existingProduct) {
      return res.status(409).json({
        message: "You have already added this product",
        success: false,
      });
    }

    // Create new product
    const newProduct =await Product.create({
      name,
      price,
      image,
      description,
      createdBy,
    });

    return res.status(201).json({
      message: "Product added successfully",
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.log(error)
  }
};
//////
export const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching product",
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const allProduct = await Product.find();
    if (allProduct.length === 0) {
      return res.status(400).json({
        message: "No product found?",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product fetched successfully",
      products: allProduct,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (req, res) => {
try {
    const productId = req.params.id;

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can delete products",
        success: false,
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
      success: true,
    });
  }  catch (error) {
    console.log(error);
  }
};

export const upDateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, image, description } = req.body;
    if (req.user.role !== "admin") {
      return res.status(400).json({
        message: "Only admin can edit this product",
        success: false,
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        message: "Product not found",
        success: false,
      });
    }
    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;
    product.description = description || product.description;
await product.save()
    res.status(200).json({
      message: "product updated successfully",
      product: product,
      success:true
    });
  } catch (error) {
    console.log(error);
  }
};
