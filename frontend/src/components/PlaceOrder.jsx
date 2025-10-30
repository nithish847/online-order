import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../redux/userSlice";
import Navbar from "./shared/Navbar";
import { 
  FaShoppingCart, 
  FaMapMarkerAlt, 
  FaBox, 
  FaRupeeSign, 
  FaCheckCircle,
  FaArrowLeft,
  FaLeaf,
  FaTruck,
  FaShieldAlt,
  FaClock,
  FaExclamationTriangle,
  FaPlus,
  FaMinus,
  FaUpload,
  FaImage
} from "react-icons/fa";

const PlaceOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://online-order-b.onrender.com/api/v1/products/${id}`);
        if (res.data.success) {
          setProduct(res.data.product);
          setImagePreview(res.data.product.image);
        } else {
          alert("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to load product details.");
      } finally {
        setProductLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert("Please select an image file.");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB.");
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return product?.image || "";

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      
      return response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleOrder = async () => {
    if (!product || !address.trim()) {
      alert("Please fill in all required details.");
      return;
    }

    if (!token) {
      alert("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      // Upload image if a new one is selected
      let imageUrl = product.image;
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const orderData = {
        address,
        products: [
          {
            productId: product._id,
            quantity: parseInt(quantity),
          },
        ],
        // Include the image URL in order data if needed
        image: imageUrl,
      };

      await axios.post(
        "https://online-order-b.onrender.com/api/v1/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert("Order placed successfully!");
      navigate("/orderstatus");
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Failed to place order. Please try again.";
      console.error("Order error:", errMsg);
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // If user is not a buyer, show a restriction message
  if (user?.role !== "buyer") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto py-12 px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
            <p className="text-gray-600 mb-6">
              Only registered buyers can place orders. Please log in with a buyer account.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              Login as Buyer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (productLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading product details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto py-12 px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <FaBox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-6">
              The product you're looking for is not available.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <FaShoppingCart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Place Your Order</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Complete your purchase with fresh, farm-to-doorstep produce
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-6"
              >
                <FaArrowLeft className="w-4 h-4" />
                <span>Back to Products</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image Upload */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-2">
                      <img
                        src={imagePreview || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80"}
                        alt={product.name}
                        className="w-full h-80 object-cover rounded-xl"
                      />
                    </div>
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.category}
                    </div>
                  </div>

                  {/* File Upload Input */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <FaUpload className="text-green-600" />
                      Update Product Image (Optional)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <div className="w-full bg-white border-2 border-dashed border-gray-300 rounded-xl py-3 px-4 text-center hover:border-green-500 transition-colors">
                          <FaImage className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                          <span className="text-sm text-gray-600">
                            {imageFile ? imageFile.name : "Choose image file"}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
                        </div>
                      </label>
                      {imageFile && (
                        <button
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(product.image);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-colors text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <FaRupeeSign className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-700">₹{product.price}</span>
                    <span className="text-gray-500">per unit</span>
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                      <FaBox className="text-green-600" />
                      Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <FaMinus className="w-4 h-4" />
                      </button>
                      <span className="text-2xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-xl flex items-center justify-center transition-colors"
                      >
                        <FaPlus className="w-4 h-4" />
                      </button>
                      <span className="text-sm text-gray-500 ml-4">
                        {quantity} unit{quantity !== 1 ? 's' : ''} selected
                      </span>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                      <span className="text-2xl font-bold text-green-700">₹{totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Form */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium text-gray-800">{product.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Unit Price:</span>
                  <span className="font-medium">₹{product.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-800">Total:</span>
                    <span className="text-green-700">₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" />
                Delivery Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Delivery Address *
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 resize-none"
                    placeholder="Enter your complete delivery address including street, city, state, and PIN code"
                    rows="4"
                    required
                  />
                </div>
                
                {/* Delivery Info */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <FaTruck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">Delivery Information</h4>
                      <p className="text-blue-700 text-sm">
                        Orders are typically delivered within 24-48 hours. Free delivery on orders above ₹2000.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Features */}
            <div className="bg-green-600 text-white rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FaShieldAlt />
                Why Order With Us?
              </h3>
              <ul className="space-y-2 text-green-100 text-sm">
                <li className="flex items-center gap-2">
                  <FaLeaf className="w-4 h-4" />
                  <span>100% Fresh from Farm</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaTruck className="w-4 h-4" />
                  <span>Free Delivery Available</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaShieldAlt className="w-4 h-4" />
                  <span>Quality Guaranteed</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaClock className="w-4 h-4" />
                  <span>24/7 Customer Support</span>
                </li>
              </ul>
            </div>

            {/* Confirm Order Button */}
            <button
              onClick={handleOrder}
              disabled={loading || !address.trim()}
              className={`w-full py-4 rounded-xl text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                loading || !address.trim()
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105"
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Placing Order...
                </>
              ) : (
                <>
                  <FaShoppingCart className="w-5 h-5" />
                  Confirm Order - ₹{totalPrice}
                </>
              )}
            </button>

            {/* Security Notice */}
            <div className="text-center text-sm text-gray-500">
              <p>🔒 Your order is secure and encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;