import db from "../config/db.js";

export const getAllProducts = async () => {
  const [rows] = await db.query("SELECT * FROM products");
  return rows;
};

export const getProductById = async (id) => {
  const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];
};

export const createProduct = async (name, price) => {
  const [result] = await db.query("INSERT INTO products (name, price) VALUES (?, ?)", [name, price]);
  return { id: result.insertId, name, price };
};

export const updateProduct = async (id, name, price) => {
  await db.query("UPDATE products SET name = ?, price = ? WHERE id = ?", [name, price, id]);
};

export const deleteProduct = async (id) => {
  await db.query("DELETE FROM products WHERE id = ?", [id]);
};