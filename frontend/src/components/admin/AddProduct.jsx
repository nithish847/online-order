import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../shared/Navbar";
import { addProduct } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate=useNavigate()
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  // Get user info from redux store
  const user = useSelector((state) => state.auth.user);

  // Get products list from redux store - fixed here
  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "admin") {
      toast.error("Only admins can add products");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://online-order-b.onrender.com",
        product,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/products")

        // Update redux store with the new product
        dispatch(addProduct(res.data.product));

        setProduct({
          name: "",
          category: "",
          price: "",
          image: "",
          description: "",
        });
      } else {
        toast.error(res.data.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Category</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>

        {/* Optional: display list of products from redux store */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Products in Store:</h3>
          <ul>
            {products.map((prod) => (
              <li key={prod._id} className="mb-2 border-b pb-2">
                <strong>{prod.name}</strong> - {prod.category} - ₹{prod.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
