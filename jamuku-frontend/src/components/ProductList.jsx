import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const ProductList = () => {
  const { mutate } = useSWRConfig();

  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  };

  const { data } = useSWR("products", fetcher);
  if (!data) return <div className="text-center mt-20 text-gray-600 text-xl">Loading products...</div>;

  const deleteProduct = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      mutate("products");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
          <Link
            to="/add"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg transition duration-200"
          >
            + Add Product
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-xs uppercase tracking-wider text-gray-700">
              <tr>
                <th className="py-3 px-4 text-center">No</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr
                  key={product.id}
                  className="bg-white border-b hover:bg-gray-50 transition duration-150"
                >
                  <td className="py-3 px-4 text-center">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{product.name}</td>
                  <td className="py-3 px-4">Rp {product.price.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Link
                      to={`/edit/${product.id}`}
                      className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.length === 0 && (
            <div className="text-center text-gray-500 py-6">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;