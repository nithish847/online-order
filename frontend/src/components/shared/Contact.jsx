import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { FaUser, FaEnvelope, FaTag, FaCommentDots, FaPaperPlane, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 py-16 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-green-100">
            We're here to help! Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" />
                Get In Touch
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">support@example.com</p>
                    <p className="text-sm text-gray-500">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Response Time</h4>
                    <p className="text-gray-600">Usually within 2 hours</p>
                    <p className="text-sm text-gray-500">During business hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-green-600 text-white rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-3">Why Contact Us?</h3>
              <ul className="space-y-2 text-green-100 text-sm">
                <li>• Get personalized support</li>
                <li>• Quick resolution to issues</li>
                <li>• Expert advice for your needs</li>
                <li>• Priority customer service</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and our team will get back to you as soon as possible.
                </p>
              </div>

              {successMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {errorMsg}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <FaUser className="absolute top-4 left-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50"
                    />
                  </div>

                  <div className="relative">
                    <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50"
                    />
                  </div>
                </div>

                <div className="relative">
                  <FaTag className="absolute top-4 left-4 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Message Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50"
                  />
                </div>

                <div className="relative">
                  <FaCommentDots className="absolute top-4 left-4 text-gray-400" />
                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Write your message here... Please include any relevant details that will help us assist you better."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-gray-500 text-sm">
                  We typically respond to all messages within 2-4 hours during business days.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Immediate Assistance?</h3>
          <p className="text-gray-600 mb-6">
            For urgent matters, feel free to call us directly at <span className="text-green-600 font-semibold">+1 (555) 123-4567</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-500">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Business Hours</h4>
              <p>Monday - Friday: 9AM - 6PM</p>
              <p>Saturday: 10AM - 4PM</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Email Support</h4>
              <p>support@example.com</p>
              <p>sales@example.com</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Office Location</h4>
              <p>123 Business Street</p>
              <p>Suite 100, City, State 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;