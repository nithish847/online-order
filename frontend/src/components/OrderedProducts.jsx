import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";
import { useNavigate } from "react-router-dom";

const OrderedProducts = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Please login to view your products.");
      navigate("/login");
      return;
    }

    const fetchOrderedProducts = async () => {
      try {
        const res = await axios.get("https://online-order-b.onrender.com/api/v1/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderedProducts();
  }, [token, navigate]);

  const handleCancelOrder = async (orderId) => {
    console.log("Cancel button clicked for orderId:", orderId);
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    if (!token) {
      alert("You must be logged in to cancel orders.");
      return;
    }

    try {
      setCancelingId(orderId);
      const res = await axios.delete(`https://online-order-b.onrender.com/api/v1/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data.success) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
        alert("Order canceled successfully");
      } else {
        alert("Failed to cancel the order: " + (res.data.message || ""));
      }
    } catch (err) {
      alert("Failed to cancel the order.");
      console.error("Cancel order error:", err);
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Ordered Products</h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded bg-gray-50 shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">Order ID: {order._id}</h3>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.products.map((item, index) => {
                    const name = item.product?.name || "Unknown Product";
                    const quantity = item.quantity;
                    const price = item.product?.price || 0;
                    const image = item.product?.image || "https://via.placeholder.com/100";

                    return (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow border hover:shadow-lg transition p-3"
                      >
                        <img
                          src={image}
                          alt={name}
                          className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        <div className="flex flex-col gap-1">
                          <h4 className="text-base font-semibold text-gray-800 capitalize">{name}</h4>
                          <p className="text-sm text-gray-600">
                            Quantity: {quantity} | ₹{price} each
                          </p>
                          <p className="text-sm font-bold text-green-700">₹{quantity * price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Cancel Order Button (case insensitive check for status) */}
                {order.status?.toLowerCase() !== "delivered" && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      disabled={cancelingId === order._id}
                      className={`px-4 py-2 text-sm text-white rounded ${
                        cancelingId === order._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {cancelingId === order._id ? "Cancelling..." : "Cancel Order"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderedProducts;
