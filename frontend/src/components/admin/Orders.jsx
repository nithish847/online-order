import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import { 
  FaShoppingBag, 
  FaUser, 
  FaBox, 
  FaShoppingCart, 
  FaMoneyBill,
  FaExchangeAlt,
  FaClock,
  FaCheckCircle,
  FaShippingFast,
  FaTruck,
  FaSearch,
  FaFilter,
  FaSync,
  FaEye
} from "react-icons/fa";

const statusColors = {
  placed: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
};

const statusIcons = {
  placed: <FaClock className="w-4 h-4" />,
  processing: <FaExchangeAlt className="w-4 h-4" />,
  shipped: <FaShippingFast className="w-4 h-4" />,
  delivered: <FaCheckCircle className="w-4 h-4" />,
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://online-order-b.onrender.com/api/v1/orders", {
        withCredentials: true,
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        alert("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Error fetching orders");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      const response = await axios.put(
        `https://online-order-b.onrender.com/api/v1/orders/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (!response.data.success) {
        alert("Failed to update status");
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
      fetchOrders();
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch = 
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyer?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products?.some(p => 
        p.product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: orders.length,
    placed: orders.filter(o => o.status === 'placed').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-500 text-lg mt-4">Loading orders...</p>
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
            <h1 className="text-4xl font-bold mb-4">Manage Customer Orders</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Track and update order statuses to ensure timely delivery and customer satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Orders", value: stats.total, color: "bg-blue-500", icon: <FaShoppingBag /> },
            { label: "Placed", value: stats.placed, color: "bg-yellow-500", icon: <FaClock /> },
            { label: "Processing", value: stats.processing, color: "bg-blue-500", icon: <FaExchangeAlt /> },
            { label: "Shipped", value: stats.shipped, color: "bg-purple-500", icon: <FaShippingFast /> },
            { label: "Delivered", value: stats.delivered, color: "bg-green-500", icon: <FaCheckCircle /> },
          ].map((stat, index) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`}>
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
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, buyers, or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Filters and Refresh */}
            <div className="flex items-center gap-4">
              {/* Filter */}
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-600" />
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
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                <FaSync className={`${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
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
                : "Customer orders will appear here when they place orders through the system."
              }
            </p>
            {(searchTerm || filter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <FaShoppingBag className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order._id?.slice(-8).toUpperCase()}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <FaUser className="w-4 h-4" />
                            <span>{order.buyer?.fullname || order.buyer}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaMoneyBill className="w-4 h-4" />
                            <span>₹{order.price || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border ${statusColors[order.status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
                        {statusIcons[order.status]}
                        <span className="capitalize">{order.status}</span>
                      </span>

                      <select
                        className="border border-gray-300 rounded-xl px-4 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                      >
                        <option value="placed">Placed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Products */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <FaBox className="text-green-600" />
                        Products
                      </h4>
                      <div className="space-y-2">
                        {order.products?.map((p, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{p.product?.name}</span>
                            <span className="text-gray-600">x{p.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <FaEye className="text-green-600" />
                        Order Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Items:</span>
                          <span className="text-gray-700">
                            {order.products?.reduce((acc, p) => acc + p.quantity, 0) || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Products:</span>
                          <span className="text-gray-700">{order.products?.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Order Value:</span>
                          <span className="text-gray-700 font-medium">₹{order.price || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Order ID: {order._id}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => updateStatus(order._id, "processing")}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Mark as Processing
                      </button>
                      {order.status === "processing" && (
                        <button
                          onClick={() => updateStatus(order._id, "shipped")}
                          className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                        >
                          Mark as Shipped
                        </button>
                      )}
                      {order.status === "shipped" && (
                        <button
                          onClick={() => updateStatus(order._id, "delivered")}
                          className="text-green-600 hover:text-green-700 font-medium text-sm"
                        >
                          Mark as Delivered
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;