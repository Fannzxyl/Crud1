import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setName(response.data.name);
      setPrice(response.data.price);
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:5000/products/${id}`, {
      name,
      price: parseInt(price),
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-10 transition-transform duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Edit Product</h2>
        <form onSubmit={updateProduct} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none transition"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Price</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none transition"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition duration-200 shadow-md"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;