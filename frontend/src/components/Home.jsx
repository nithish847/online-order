import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './shared/Navbar';
import { motion } from 'framer-motion';
import { Truck, Shield, Star, Users, Package, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 md:py-24 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" fill="currentColor" />
                Trusted by 500+ Businesses
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Bulk <span className="text-green-600">Fruits & Vegetables</span> for Your Business
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                Direct from farm to your business. Premium quality at wholesale prices. 
                Perfect for restaurants, retailers, and food services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link to="/products">
                  <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Shop Bulk Orders
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Business Account
                  </button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Volume Discounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Quality Guarantee</span>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-green-200 to-emerald-300 rounded-3xl p-8 transform rotate-1 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 transform -rotate-1 shadow-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                    alt="Fresh vegetables in bulk crates"
                    className="w-full h-64 md:h-80 object-cover rounded-xl"
                    loading="eager"
                  />
                </div>
                
                {/* Floating Business Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-green-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-green-700">Free Delivery</div>
                      <div className="text-xs text-gray-600">Orders over ₹2000</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-green-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">💰</span>
                    </div>
                    <div>
                      <div className="font-bold text-green-700">Bulk Discounts</div>
                      <div className="text-xs text-gray-600">Up to 20% off</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FreshFarm Bulk?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Designed specifically for businesses that demand quality, reliability, and value
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Free Delivery",
                description: "Next-day delivery for orders above ₹2000",
                color: "green"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Quality Guarantee",
                description: "100% freshness with quality checks",
                color: "blue"
              },
              {
                icon: <Package className="w-8 h-8" />,
                title: "Bulk Pricing",
                description: "Volume-based discounts for businesses",
                color: "orange"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Dedicated Support",
                description: "Account manager for business clients",
                color: "purple"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                  feature.color === 'green' ? 'bg-green-100 text-green-600' :
                  feature.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  feature.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Business-Grade Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Premium selection curated for commercial kitchens and retail businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "🍎",
                title: "Fresh Fruits",
                description: "Seasonal & exotic varieties",
                packages: ["5kg Crate", "10kg Box", "25kg Bulk"],
                color: "from-orange-50 to-amber-100"
              },
              {
                emoji: "🥦",
                title: "Vegetables",
                description: "Leafy, root & seasonal",
                packages: ["10kg Pack", "25kg Crate", "50kg Bulk"],
                color: "from-green-50 to-emerald-100"
              },
              {
                emoji: "🌿",
                title: "Organic Produce",
                description: "Certified pesticide-free",
                packages: ["Limited Stock", "Premium Quality", "Daily Fresh"],
                color: "from-lime-50 to-green-100"
              },
              {
                emoji: "🎯",
                title: "Seasonal Specials",
                description: "Market best picks",
                packages: ["Best Prices", "Limited Time", "Fresh Stock"],
                color: "from-amber-50 to-orange-100"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-gray-200 hover:border-green-300 transition-all duration-300"
              >
                <div className={`h-40 ${category.color} flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-6xl z-10">{category.emoji}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <div className="space-y-2">
                    {category.packages.map((pkg, pkgIndex) => (
                      <div key={pkgIndex} className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>{pkg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-gray-600">
              See why restaurants and retailers choose FreshFarm for their bulk produce needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Owner, Spice Garden Restaurant",
                comment: "Cut our vegetable costs by 30% while maintaining premium quality. The bulk pricing is unbeatable.",
                avatar: "RK",
                business: "Restaurant"
              },
              {
                name: "Priya Sharma",
                role: "Procurement Head, FoodChain Retail",
                comment: "Daily fresh deliveries transformed our supply chain. Consistent quality across all 12 outlets.",
                avatar: "PS",
                business: "Retail Chain"
              },
              {
                name: "Anil Patel",
                role: "CEO, Grand Catering Services",
                comment: "The volume discounts and reliable supply made FreshFarm our exclusive vegetable partner.",
                avatar: "AP",
                business: "Catering Service"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-green-600 text-lg">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-green-600 text-sm font-medium">{testimonial.role}</p>
                    <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs mt-1">
                      <Users className="w-3 h-3" />
                      {testimonial.business}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">"{testimonial.comment}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-400">
                    {"★".repeat(5)}
                  </div>
                  <div className="text-xs text-gray-500">Verified Business</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Optimize Your Supply Chain?
            </h2>
            <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto leading-relaxed">
              Join 500+ businesses that trust FreshFarm for premium quality produce at wholesale prices
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/signup">
                <button className="bg-white text-green-600 hover:bg-green-50 font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  Create Business Account
                </button>
              </Link>
              <Link to="/products">
                <button className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-3">
                  <Package className="w-5 h-5" />
                  Browse Bulk Products
                </button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 text-green-100 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" fill="currentColor" />
                <span>500+ Businesses</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 hover:scale-110 transition-all duration-300 text-white p-4 rounded-2xl shadow-2xl text-2xl z-50 flex items-center justify-center w-16 h-16 group"
        title="Chat with us for bulk orders"
      >
        <span className="text-2xl">💬</span>
        <div className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Bulk Order Inquiry
        </div>
      </a>
    </div>
  );
};

export default Home;