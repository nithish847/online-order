import Navbar from './shared/Navbar';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLeaf, 
  FaTruck, 
  FaAward, 
  FaUsers,
  FaHeart,
  FaShoppingBasket,
  FaStar,
  FaSeedling,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const featureItems = [
    {
      icon: <FaLeaf className="text-green-600" />,
      title: "Fresh From Farms",
      description: "Direct from local farms to ensure maximum freshness and nutrition"
    },
    {
      icon: <FaTruck className="text-green-600" />,
      title: "Fast Delivery",
      description: "Quick and reliable delivery to your doorstep within hours"
    },
    {
      icon: <FaAward className="text-green-600" />,
      title: "Quality Assured",
      description: "Rigorous quality checks to maintain the highest standards"
    },
    {
      icon: <FaUsers className="text-green-600" />,
      title: "Community Focus",
      description: "Supporting local farmers and building sustainable communities"
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "50+", label: "Local Farms" },
    { number: "100%", label: "Fresh Quality" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <motion.div
        className="relative bg-gradient-to-r from-green-600 to-emerald-700 py-20 text-white"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeIn}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <FaShoppingBasket className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6">About FreshFarm Bulk</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Your trusted partner for fresh, high-quality fruits and vegetables delivered directly from local farms to your doorstep.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          {/* Text Content */}
          <motion.div variants={fadeIn} className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Welcome to <span className="text-green-600 font-semibold">FreshFarm Bulk</span>, your trusted online marketplace for fresh fruits and vegetables. Our passion is to deliver the highest quality produce directly from local farms to your doorstep.
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6 mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  We collaborate with dedicated farmers to ensure freshness and nutrition in every bite. Our admins carefully manage the inventory and update stock regularly, so you never miss out on seasonal specialties.
                </p>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                Shopping with FreshFarm Bulk means convenience, quality, and sustainability. Join our community and enjoy the best nature has to offer!
              </p>
            </div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-6 mt-8"
              variants={fadeIn}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm border border-green-100">
                  <div className="text-2xl font-bold text-green-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="/products"
                className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaShoppingBasket className="mr-3" />
                Shop Fresh Products
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center border border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                Contact Us
              </a>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={fadeIn}
            className="relative"
          >
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-1 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Fresh fruits and vegetables"
                className="w-full h-96 object-cover rounded-2xl"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FaHeart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">Since 2020</div>
                  <div className="text-sm text-gray-600">Serving with love</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <motion.div variants={fadeIn} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We are committed to providing the best quality produce with exceptional service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureItems.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 hover:shadow-lg transition-all duration-300 hover:border-green-300 group"
              >
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission & Values */}
        <motion.div
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="max-w-4xl mx-auto text-center">
            <FaSeedling className="w-12 h-12 mx-auto mb-6 text-green-200" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-green-100 leading-relaxed">
              To revolutionize the way people access fresh produce by creating a sustainable ecosystem that benefits farmers, 
              customers, and the environment. We believe everyone deserves access to fresh, nutritious food while supporting 
              local agriculture and reducing our carbon footprint.
            </p>
          </div>
        </motion.div>

        {/* Contact & Social Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          {/* Contact Info */}
          <motion.div variants={fadeIn}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FaMapMarkerAlt className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Our Location</div>
                  <div className="text-gray-600">123 FreshFarm Plaza, Mumbai</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FaPhone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Call Us</div>
                  <div className="text-gray-600">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FaEnvelope className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Email Us</div>
                  <div className="text-gray-600">hello@freshfarm.com</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={fadeIn}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Connect With Us</h3>
            <p className="text-gray-600 mb-6">
              Follow us on social media to stay updated with our latest offers, farm stories, and healthy recipes.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebookF />, label: "Facebook", color: "hover:bg-blue-600" },
                { icon: <FaTwitter />, label: "Twitter", color: "hover:bg-blue-400" },
                { icon: <FaInstagram />, label: "Instagram", color: "hover:bg-pink-600" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl transition-all duration-300 hover:text-white ${social.color} transform hover:scale-110`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-center gap-3">
                <FaStar className="text-yellow-500 text-xl" />
                <div>
                  <div className="font-semibold text-gray-800">Join Our Community</div>
                  <div className="text-gray-600 text-sm">Be part of our growing family of health-conscious individuals</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;