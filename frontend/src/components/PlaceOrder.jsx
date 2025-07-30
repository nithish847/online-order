import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../redux/userSlice"; // Make sure selectUser returns role too
import Navbar from "./shared/Navbar";

const PlaceOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser); // Assuming this includes the role

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          alert("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to load product details.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleOrder = async () => {
    if (!product || !address.trim()) {
      alert("Please fill in all required details.");
      return;
    }

    if (!token) {
      alert("User not authenticated");
      return;
    }

    const orderData = {
      address,
      products: [
        {
          productId: product._id,
          quantity: parseInt(quantity),
        },
      ],
    };

    try {
      await axios.post(
        "http://localhost:3000/api/v1/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert("Order placed successfully!");
      navigate("/orderstatus");  // Navigate to My Orders page
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Failed to place order. Please try again.";
      console.error("Order error:", errMsg);
      alert(errMsg);
    }
  };

  // If user is not a buyer, show a restriction message
  if (user?.role !== "buyer") {
    return (
      <div>
        <Navbar />
        <div className="p-8 text-center text-red-600 text-xl font-semibold">
          Only buyers can place orders.
        </div>
      </div>
    );
  }

  if (!product) return <div className="p-8">Loading product...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-12 bg-white shadow p-6 rounded">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Place Order</h2>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 rounded shadow"
          />
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-700 font-bold">₹{product.price} per unit</p>

            <label className="block">
              Quantity:
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="block mt-1 border border-gray-300 px-3 py-2 rounded w-24"
              />
            </label>

            <label className="block">
              Delivery Address:
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block mt-1 border border-gray-300 px-3 py-2 rounded w-full"
                placeholder="Enter full address"
              />
            </label>

            <p className="text-lg font-medium">
              Total: ₹{product.price * quantity}
            </p>

            <button
              onClick={handleOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
