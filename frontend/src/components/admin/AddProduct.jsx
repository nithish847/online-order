import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../shared/Navbar";
import { addProduct } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { 
  FaPlusCircle, 
  FaTag, 
  FaList, 
  FaDollarSign, 
  FaImage, 
  FaFileAlt,
  FaUpload,
  FaArrowLeft,
  FaBoxOpen
} from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();
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
       "https://online-order-b.onrender.com/api/v1/products",
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <FaPlusCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Add New Product</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Expand your product catalog by adding fresh fruits and vegetables to the marketplace.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {/* Header with Back Button */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Information</h2>
                  <p className="text-gray-600">Fill in the details below to add a new product</p>
                </div>
                <button
                  onClick={() => navigate("/products")}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <FaArrowLeft />
                  <span>Back to Products</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaTag className="w-4 h-4 text-green-600" />
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Fresh Apples, Organic Tomatoes"
                    value={product.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <FaList className="w-4 h-4 text-green-600" />
                      Category *
                    </label>
                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50"
                    >
                      <option value="">Select Category</option>
                      <option value="Fruit">Fruit</option>
                      <option value="Vegetable">Vegetable</option>
                      <option value="Herbs">Herbs</option>
                      <option value="Organic">Organic</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <FaDollarSign className="w-4 h-4 text-green-600" />
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      value={product.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaImage className="w-4 h-4 text-green-600" />
                    Image URL *
                  </label>
                  <input
                    type="text"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={product.image}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50"
                  />
                  {product.image && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                      <img 
                        src={product.image} 
                        alt="Preview" 
                        className="h-20 w-20 object-cover rounded-lg border border-gray-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaFileAlt className="w-4 h-4 text-green-600" />
                    Description *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe the product features, quality, origin, and any other relevant details..."
                    value={product.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    loading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <FaUpload />
                      Add Product
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - Guidelines and Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guidelines Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-green-600" />
                Adding Product Guidelines
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Use clear, high-quality product images</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Provide accurate pricing information</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Write detailed and honest descriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Select the appropriate category</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Ensure all fields are filled accurately</span>
                </li>
              </ul>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-green-600 text-white rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FaBoxOpen />
                Inventory Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Total Products</span>
                  <span className="font-bold text-xl">{products.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Fruits</span>
                  <span className="font-bold">
                    {products.filter(p => p.category === 'Fruit').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Vegetables</span>
                  <span className="font-bold">
                    {products.filter(p => p.category === 'Vegetable').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Pro Tips</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Use descriptive names that customers will search for</p>
                <p>• Include origin information for premium products</p>
                <p>• Mention organic certifications if applicable</p>
                <p>• Set competitive pricing based on market research</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
