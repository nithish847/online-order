
import Navbar from './shared/Navbar';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-sans">
      <Navbar />

      <motion.div
        className="max-w-5xl mx-auto p-10 mt-16 bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Text Content */}
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-4xl font-extrabold text-green-700 tracking-tight">About FreshMart</h1>

          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to FreshMart, your trusted online marketplace for fresh fruits and vegetables. Our passion is to deliver the highest quality produce directly from local farms to your doorstep.
          </p>

          <div className="border-l-4 border-green-400 pl-4">
            <p className="text-gray-700 text-lg leading-relaxed">
              We collaborate with dedicated farmers to ensure freshness and nutrition in every bite. Our admins carefully manage the inventory and update stock regularly, so you never miss out on seasonal specialties.
            </p>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">
            Shopping with FreshMart means convenience, quality, and sustainability. Join our community and enjoy the best nature has to offer!
          </p>

          {/* Call to Action */}
          <a
            href="/products"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Shop Now
          </a>

          {/* Social Media */}
          <div className="flex items-center space-x-6 mt-6 text-green-600 text-2xl">
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-green-800 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-green-800 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-green-800 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Image */}
        <motion.div
          className="md:w-1/2 rounded-xl shadow-2xl overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVUfBab4I0SHqu6nzcjKBiiDAiJbE56OR-LQ&s"
            alt="Fresh fruits and vegetables"
            className="object-cover w-full h-96"
            loading="lazy"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
