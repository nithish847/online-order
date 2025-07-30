import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
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
      }
    };

    fetchOrders();
  }, [token, navigate]);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-3xl font-bold text-green-700 mb-6">My Orders</h2>

        {loading ? (
          <p className="text-gray-600">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const orderId = order._id || Math.random().toString(36).slice(2);
              const orderDate = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : "N/A";

              const orderTotal = order.products.reduce(
                (sum, item) => sum + item.quantity * (item.product?.price || 0),
                0
              );

              const isDelivered = order.status?.toLowerCase() === "delivered";

              return (
                <div key={orderId}>
                  <div
                    className="border rounded p-6 shadow-sm hover:shadow-md transition bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Order ID: {orderId}
                      </h3>
                      <span
                        className={`text-sm px-3 py-1 rounded-full capitalize ${
                          isDelivered
                            ? "bg-green-100 text-green-700"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">Ordered on: {orderDate}</p>

                    <div className="space-y-3">
                      {order.products?.map((item, index) => {
                        const product = item.product;
                        const productName = product?.name || "Unknown Product";
                        const quantity = item.quantity || 1;
                        const price = product?.price || 0;

                        return (
                          <div
                            key={index}
                            className="border border-gray-300 rounded p-3 bg-white"
                          >
                            <p className="text-base font-medium capitalize">{productName}</p>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                              <span>
                                Quantity: {quantity} | ₹{price} each
                              </span>
                              <span className="font-semibold text-green-700">
                                ₹{quantity * price}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-sm font-semibold text-right text-green-700 mt-5">
                      Order Total: ₹{orderTotal}
                    </p>
                  </div>

                  {isDelivered && (
                    <div
                      className="mt-4 p-4 bg-green-50 border border-green-200 rounded shadow-md overflow-hidden"
                      role="alert"
                    >
                      <div className="whitespace-nowrap animate-marquee flex items-center space-x-3 text-green-700 font-medium">
                        <svg
                          className="w-6 h-6 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Thank you for your order! We hope you enjoy your purchase.</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tailwind Animation - Marquee */}
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-marquee {
            display: inline-block;
            animation: marquee 10s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default MyOrders;
