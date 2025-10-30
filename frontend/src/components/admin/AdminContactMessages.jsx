import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import { 
  FaRegSmile, 
  FaClipboardList, 
  FaEnvelope, 
  FaUser, 
  FaCalendar,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaSync,
  FaSearch,
  FaFilter
} from "react-icons/fa";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
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
        setRefreshing(false);
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

  const handleRefresh = () => {
    setRefreshing(true);
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/contact/admin/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setMessages(res.data.messages);
        }
      } catch (error) {
        console.error("Error refreshing messages:", error);
      } finally {
        setRefreshing(false);
      }
    };
    fetchMessages();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <FaEyeSlash className="text-orange-500" />;
      case "read":
        return <FaEye className="text-blue-500" />;
      case "replied":
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaEnvelope className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "read":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "replied":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === "all" || message.status === filter;
    const matchesSearch = message.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === "new").length,
    read: messages.filter(m => m.status === "read").length,
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading messages...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <FaClipboardList className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Customer Messages</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Manage and respond to customer inquiries. Your support helps build trust and improve our services.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                <FaEnvelope className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Messages</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.new}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                <FaEyeSlash className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Read Messages</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.read}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                <FaEye className="w-6 h-6" />
              </div>
            </div>
          </div>
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
                  placeholder="Search messages, names, or emails..."
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
                  <option value="all">All Messages</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
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

      {/* Messages Section */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
            <FaClipboardList className="text-green-600" /> 
            Buyer Contact Messages
          </h2>

          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaEnvelope className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {searchTerm || filter !== "all" ? "No matching messages" : "No messages yet"}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchTerm || filter !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Customer messages will appear here when they contact you through the contact form."
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
              {filteredMessages.map(({ _id, name, email, subject, message, status, createdAt }) => (
                <div
                  key={_id}
                  className="border-l-4 border-green-400 bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Message Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <FaUser className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <FaEnvelope className="w-4 h-4" />
                            <span>{email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaCalendar className="w-4 h-4" />
                            <span>
                              {new Date(createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
                        {getStatusIcon(status)}
                        <span className="capitalize">{status}</span>
                      </span>

                      <select
                        value={status}
                        onChange={(e) => updateStatus(_id, e.target.value)}
                        className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  {subject && (
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-900">Subject:</h4>
                      <p className="text-gray-700">{subject}</p>
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Message:</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {message}
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Message ID: {_id?.slice(-8).toUpperCase()}
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={`mailto:${email}?subject=Re: ${subject}&body=Dear ${name},%0D%0A%0D%0AThank you for contacting us. `}
                        className="text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        Reply via Email
                      </a>
                      {status === "new" && (
                        <button
                          onClick={() => updateStatus(_id, "read")}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Motivation */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <FaRegSmile className="text-yellow-400 text-xl" />
            <p className="text-lg font-medium">
              Keep up the good work, Admin! Every message you process makes a difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactMessages;