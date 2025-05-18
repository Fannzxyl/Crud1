import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../models/ProductModel.js";

export const showProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const showProductById = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createNewProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const newProduct = await createProduct(name, price);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProductData = async (req, res) => {
  const { name, price } = req.body;
  try {
    await updateProduct(req.params.id, name, price);
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProductData = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};