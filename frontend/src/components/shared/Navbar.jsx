import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { 
  FaHome, 
  FaShoppingBasket, 
  FaEnvelope, 
  FaShoppingCart, 
  FaClipboardList,
  FaPlusCircle,
  FaComments,
  FaBox,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === "admin";
  const isBuyer = user?.role === "buyer";

  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.clear();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🍎</span>
              </div>
              <span>FreshFarm Bulk</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/" icon={<FaHome />} onClick={closeMobileMenu}>
                Home
              </NavLink>
              <NavLink to="/products" icon={<FaShoppingBasket />} onClick={closeMobileMenu}>
                Products
              </NavLink>

              {/* Contact link visible to everyone */}
    

              {isBuyer && (
                <>
                  <NavLink to="/placeorder" icon={<FaShoppingCart />} onClick={closeMobileMenu}>
                    Place Order
                  </NavLink>
                  <NavLink to="/orderstatus" icon={<FaClipboardList />} onClick={closeMobileMenu}>
                    Order Status
                  </NavLink>
                   <NavLink to="/contact" icon={<FaEnvelope />} onClick={closeMobileMenu}>
                Contact
              </NavLink>
                </>
              )}

              {isAdmin && (
                <>
                  <NavLink to="/add-product" icon={<FaPlusCircle />} onClick={closeMobileMenu}>
                    Add Product
                  </NavLink>
                  <NavLink to="/admin/contact-messages" icon={<FaComments />} onClick={closeMobileMenu}>
                    Messages
                  </NavLink>
                  <NavLink to="/orders" icon={<FaBox />} onClick={closeMobileMenu}>
                    All Orders
                  </NavLink>
                </>
              )}
            </div>

            {/* Right-side Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!user ? (
                <>
                  <Link to="/login">
                    <button className="px-6 py-2 border border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-all duration-300 font-medium">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                    <FaUserCircle className="text-green-600" />
                    <span className="font-medium text-gray-700">
                      {user.fullname}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-xl">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <MobileNavLink to="/" icon={<FaHome />} onClick={closeMobileMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/products" icon={<FaShoppingBasket />} onClick={closeMobileMenu}>
                Products
              </MobileNavLink>
              <MobileNavLink to="/contact" icon={<FaEnvelope />} onClick={closeMobileMenu}>
                Contact
              </MobileNavLink>

              {isBuyer && (
                <>
                  <MobileNavLink to="/placeorder" icon={<FaShoppingCart />} onClick={closeMobileMenu}>
                    Place Order
                  </MobileNavLink>
                  <MobileNavLink to="/orderstatus" icon={<FaClipboardList />} onClick={closeMobileMenu}>
                    Order Status
                  </MobileNavLink>
                </>
              )}

              {isAdmin && (
                <>
                  <MobileNavLink to="/add-product" icon={<FaPlusCircle />} onClick={closeMobileMenu}>
                    Add Product
                  </MobileNavLink>
                  <MobileNavLink to="/admin/contact-messages" icon={<FaComments />} onClick={closeMobileMenu}>
                    Contact Messages
                  </MobileNavLink>
                  <MobileNavLink to="/orders" icon={<FaBox />} onClick={closeMobileMenu}>
                    All Orders
                  </MobileNavLink>
                </>
              )}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200">
                {!user ? (
                  <div className="space-y-3">
                    <Link to="/login" onClick={closeMobileMenu}>
                      <button className="w-full px-6 py-3 border border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-all duration-300 font-medium">
                        Login
                      </button>
                    </Link>
                    <Link to="/signup" onClick={closeMobileMenu}>
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                      <FaUserCircle className="text-green-600" />
                      <div>
                        <p className="font-medium text-gray-700">{user.fullname}</p>
                        <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium border border-red-200"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

// Reusable Desktop NavLink Component
const NavLink = ({ to, icon, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-green-600 rounded-xl transition-all duration-300 hover:bg-green-50 font-medium group"
  >
    <span className="text-green-500 group-hover:text-green-600 transition-colors">
      {icon}
    </span>
    <span>{children}</span>
  </Link>
);

// Reusable Mobile NavLink Component
const MobileNavLink = ({ to, icon, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-green-600 rounded-xl transition-all duration-300 hover:bg-green-50 font-medium border border-gray-100"
  >
    <span className="text-green-500">
      {icon}
    </span>
    <span>{children}</span>
  </Link>
);

export default Navbar;