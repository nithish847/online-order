import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";
import { useNavigate } from "react-router-dom";
import { 
  FaShoppingBag, 
  FaClock, 
  FaCheckCircle, 
  FaShippingFast, 
  FaTruck,
  FaBox,
  FaCalendarAlt,
  FaRupeeSign,
  FaExclamationTriangle,
  FaLeaf,
  FaArrowLeft,
  FaSync,
  FaSearch
} from "react-icons/fa";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Please login to view your orders.");
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://online-order-b.onrender.com/api/v1/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error.response?.data || error.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };


    fetchOrders();
  }, [token, navigate]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/orders/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error.response?.data || error.message);
      setOrders([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <FaCheckCircle className="text-green-500" />;
      case "shipped":
        return <FaTruck className="text-blue-500" />;
      case "processing":
        return <FaShippingFast className="text-yellow-500" />;
      case "placed":
        return <FaClock className="text-purple-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "placed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === "all" || order.status?.toLowerCase() === filter;
    const matchesSearch = 
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products?.some(item => 
        item.product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status?.toLowerCase() === 'delivered').length,
    processing: orders.filter(o => o.status?.toLowerCase() === 'processing').length,
    placed: orders.filter(o => o.status?.toLowerCase() === 'placed').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading your orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <FaShoppingBag className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">My Orders</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Track your orders and stay updated with delivery status
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Orders", value: stats.total, color: "bg-blue-500", icon: <FaShoppingBag /> },
            { label: "Placed", value: stats.placed, color: "bg-purple-500", icon: <FaClock /> },
            { label: "Processing", value: stats.processing, color: "bg-yellow-500", icon: <FaShippingFast /> },
            { label: "Delivered", value: stats.delivered, color: "bg-green-500", icon: <FaCheckCircle /> },
          ].map((stat, index) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls Section */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Back Button */}
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium lg:w-auto w-full justify-center lg:justify-start"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Back to Shopping</span>
            </button>

            <div className="flex flex-col lg:flex-row lg:items-center gap-4 flex-1 lg:justify-end">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders or products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Filter and Refresh */}
              <div className="flex items-center gap-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Orders</option>
                  <option value="placed">Placed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>

                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
                >
                  <FaSync className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {searchTerm || filter !== "all" ? "No matching orders" : "No orders yet"}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || filter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Start shopping to see your orders here!"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/products")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
              >
                Start Shopping
              </button>
              {(searchTerm || filter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilter("all");
                  }}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const orderId = order._id || Math.random().toString(36).slice(2);
              const orderDate = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : "N/A";

              const orderTotal = order.products.reduce(
                (sum, item) => sum + item.quantity * (item.product?.price || 0),
                0
              );

              const isDelivered = order.status?.toLowerCase() === "delivered";

              return (
                <div key={orderId} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <FaBox className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{orderId.slice(-8).toUpperCase()}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <FaCalendarAlt className="w-4 h-4" />
                              <span>{orderDate}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FaRupeeSign className="w-4 h-4" />
                              <span className="font-medium">{orderTotal}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status || "Pending"}</span>
                        </span>
                      </div>
                    </div>

                    {/* Products List */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 mb-3">Order Items:</h4>
                      {order.products?.map((item, index) => {
                        const product = item.product;
                        const productName = product?.name || "Unknown Product";
                        const quantity = item.quantity || 1;
                        const price = product?.price || 0;
                        const total = quantity * price;

                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-green-50 transition-colors"
                          >
                            <div className="flex items-center space-x-4 flex-1">
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                                <FaLeaf className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 capitalize">{productName}</p>
                                <p className="text-sm text-gray-600">
                                  Quantity: {quantity} × ₹{price}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-700">₹{total}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Order Summary */}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        Order ID: {orderId}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-xl font-bold text-green-700">₹{orderTotal}</p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Celebration */}
                  {isDelivered && (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4">
                      <div className="flex items-center justify-center space-x-3 animate-pulse">
                        <FaCheckCircle className="w-5 h-5" />
                        <span className="font-medium">Thank you for your order! We hope you enjoy your fresh produce! 🎉</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Support Section */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <FaExclamationTriangle className="w-5 h-5 text-yellow-500" />
            <p className="text-lg font-medium">
              Need help with your order? Contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;