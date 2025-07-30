import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";

const statusColors = {
  placed: "bg-yellow-200 text-yellow-800",
  processing: "bg-blue-200 text-blue-800",
  shipped: "bg-purple-200 text-purple-800",
  delivered: "bg-green-200 text-green-800",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto py-10 px-6">
        <h2 className="text-4xl font-extrabold text-green-700 mb-8 text-center">
          Manage Customer Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">
            No orders found.
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
              >
                <div className="flex flex-col md:flex-row md:space-x-8 flex-1">
                  <div className="text-sm text-gray-600 break-all">
                    <span className="font-semibold">Order ID:</span> {order._id}
                  </div>

                  <div className="text-sm text-gray-700 mt-1 md:mt-0">
                    <span className="font-semibold">Buyer:</span>{" "}
                    {order.buyer?.fullname || order.buyer}
                  </div>

                  <div className="text-sm text-gray-700 mt-1 md:mt-0 max-w-xs">
                    <span className="font-semibold">Products:</span>{" "}
                    {order.products
                      ?.map((p) => `${p.product.name} (x${p.quantity})`)
                      .join(", ") || "N/A"}
                  </div>

                  <div className="text-sm text-gray-700 mt-1 md:mt-0">
                    <span className="font-semibold">Qty:</span>{" "}
                    {order.products?.reduce((acc, p) => acc + p.quantity, 0) || 0}
                  </div>

                  <div className="text-sm text-gray-700 mt-1 md:mt-0">
                    <span className="font-semibold">Price:</span> ₹{order.price || 0}
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                        statusColors[order.status] || "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <select
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
