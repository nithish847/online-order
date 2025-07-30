import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import { FaRegSmile, FaClipboardList } from "react-icons/fa";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("https://online-order-b.onrender.com/api/v1/contact/admin/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setMessages(res.data.messages);
        } else {
          console.error("Failed to fetch messages:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(
        `https://online-order-b.onrender.com/api/v1/contact/admin/messages/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === id ? res.data.updatedMsg : msg
          )
        );
      } else {
        console.error("Failed to update status:", res.data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading messages...</p>;

  return (
    <div>
      <Navbar />
      {/* Motivational Banner */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-200 py-10 text-center mb-10 shadow">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4208/4208400.png"
          alt="Support"
          className="mx-auto w-24 h-24 mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800">Help buyers make better decisions!</h1>
        <p className="text-gray-700 mt-2 text-lg">
          Review messages and give timely responses. Your support helps improve product quality.
        </p>
      </div>

      {/* Messages Section */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
          <FaClipboardList className="text-blue-500" /> Buyer Contact Messages
        </h2>

        {messages.length === 0 ? (
          <p className="text-center text-gray-600">No messages found.</p>
        ) : (
          <div className="space-y-6">
            {messages.map(({ _id, message, status }) => (
              <div
                key={_id}
                className="border-l-4 border-blue-400 bg-gray-50 p-5 rounded shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-800 mb-3">
                  <strong>Message:</strong> {message}
                </p>

                <div className="flex items-center gap-2">
                  <label className="font-medium text-gray-700">Status:</label>
                  <select
                    value={status}
                    onChange={(e) => updateStatus(_id, e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Motivation */}
      <div className="text-center mt-10 text-gray-600">
        <p className="inline-flex items-center gap-2 justify-center">
          <FaRegSmile className="text-yellow-400" />
          Keep up the good work, Admin! Every message you process makes a difference.
        </p>
      </div>
    </div>
  );
};

export default AdminContactMessages;
