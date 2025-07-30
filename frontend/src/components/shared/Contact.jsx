import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { FaUser, FaEnvelope, FaTag, FaCommentDots } from "react-icons/fa";

const Contact = () => {
  const user = useSelector((state) => state.auth.user);
  const isBuyer = user?.role === "buyer";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isBuyer) {
      navigate("/");
    }
  }, [isBuyer, navigate]);

  if (!isBuyer) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const token = localStorage.getItem("token"); // if your backend requires auth token

      const response = await axios.post(
        "https://online-order-b.onrender.com/api/v1/contact", // Replace with your actual backend endpoint
        formData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setSuccessMsg("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" }); // clear form
      } else {
        setErrorMsg("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Error occurred while sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md mx-auto p-8 mt-12 bg-white rounded shadow-md transition-shadow hover:shadow-xl">
        <h2 className="text-3xl font-bold mb-3 text-center text-green-700">
          Contact Us
        </h2>

        <p className="text-center mb-6 text-gray-700">
          Have any questions or requests? We’re here to help! Please fill out
          the form below and we’ll get back to you as soon as possible.
        </p>

        {successMsg && (
          <p className="text-green-600 text-center mb-4">{successMsg}</p>
        )}
        {errorMsg && <p className="text-red-600 text-center mb-4">{errorMsg}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-10 py-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-10 py-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <FaTag className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-10 py-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <FaCommentDots className="absolute top-3 left-3 text-gray-400" />
            <textarea
              name="message"
              rows="5"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-10 py-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
