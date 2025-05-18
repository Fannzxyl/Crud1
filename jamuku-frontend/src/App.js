import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-green-600">RempahRasa WMS</h1>
            <div className="space-x-4">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 font-semibold border-b-2 border-green-600 pb-1"
                    : "text-gray-700 hover:text-green-500"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 font-semibold border-b-2 border-green-600 pb-1"
                    : "text-gray-700 hover:text-green-500"
                }
              >
                Add Product
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;