import express from "express";
import {
  showProducts,
  showProductById,
  createNewProduct,
  updateProductData,
  deleteProductData
} from "../controllers/ProductController.js";

const router = express.Router();

router.get("/products", showProducts);
router.get("/products/:id", showProductById);
router.post("/products", createNewProduct);
router.put("/products/:id", updateProductData);
router.delete("/products/:id", deleteProductData);

export default router;