import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './shared/Navbar';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-green-600 text-white py-20 px-6 md:px-20 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Fresh Fruits & Vegetables <br className="hidden md:block" />
          Delivered To Your Doorstep
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Quality you can trust, freshness you can taste. Shop from a wide variety of farm-fresh produce.
        </p>
        <Link to="/products">
          <button className="bg-white text-green-600 font-bold px-8 py-3 rounded-lg hover:bg-green-100 transition">
            Shop Now
          </button>
        </Link>
      </motion.section>

      {/* Special Offer Banner */}
      <section className="relative py-10 px-4 md:px-0 bg-yellow-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-1/2">
            <div className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
              HOT DEAL
            </div>
            <img
              src="https://www.shutterstock.com/image-vector/30-percent-off-discount-creative-260nw-2277191641.jpg"
              alt="30% Off Promotional Banner"
              className="w-full rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
          <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-3xl font-bold text-green-700 mb-4">🎉 Limited-Time Offer!</h2>
            <p className="text-lg text-gray-700 mb-6">
              Get up to <span className="text-green-600 font-bold">30% off</span> on your first order.
              Eat healthy, live happy! Only fresh, only the best.
            </p>
            <Link to="/products">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                Grab the Offer
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto py-16 px-6 md:px-0">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
          Explore Our Fresh Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Fruits */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ2d_qH4ivsOQjDgg7ByextjmD0ayfRzz03w&s"
              alt="Fresh juicy fruits in a basket"
              className="w-full h-56 object-cover"
              loading="lazy"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2 text-green-700">Fresh Fruits</h3>
              <p className="text-gray-600">Sweet, juicy, and packed with nutrients.</p>
            </div>
          </motion.div>

          {/* Vegetables */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80"
              alt="Assorted fresh vegetables"
              className="w-full h-56 object-cover"
              loading="lazy"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2 text-green-700">Fresh Vegetables</h3>
              <p className="text-gray-600">Crisp and healthy vegetables for your meals.</p>
            </div>
          </motion.div>

          {/* Organic */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
          >
            <img
              src="https://img.freepik.com/premium-vector/fruits-vegetables-group-cartoon-illustration_11460-7946.jpg?semt=ais_hybrid&w=740"
              alt="Cartoon illustration of organic fruits and vegetables"
              className="w-full h-56 object-cover"
              loading="lazy"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2 text-green-700">Organic Produce</h3>
              <p className="text-gray-600">Certified organic for the healthiest choice.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-12 px-4 md:px-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <p className="italic text-gray-600">"Absolutely fresh and delicious fruits. Fast delivery too!"</p>
            <h4 className="font-bold mt-4 text-green-700">– Ramesh K.</h4>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <p className="italic text-gray-600">"Love the organic options. My go-to store now!"</p>
            <h4 className="font-bold mt-4 text-green-700">– Anjali M.</h4>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <p className="italic text-gray-600">"Great prices and quality. Highly recommended."</p>
            <h4 className="font-bold mt-4 text-green-700">– Vishnu S.</h4>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-green-100 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-800">
          Ready to fill your basket with fresh goodness?
        </h2>
        <Link to="/products">
          <button className="bg-green-600 text-white font-semibold px-10 py-3 rounded-lg hover:bg-green-700 transition">
            Browse Products
          </button>
        </Link>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919999999999" // Replace with your real number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 hover:scale-110 transition-all duration-300 text-white p-4 rounded-full shadow-lg text-xl z-50"
        title="Chat with us"
      >
        💬
      </a>
    </div>
  );
};

export default Home;
