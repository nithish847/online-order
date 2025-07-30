import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const isAdmin = user?.role === "admin";
  const isBuyer = user?.role === "buyer";

  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          🍎 BulkFruitsVeg
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <li>
            <Link to="/" className="hover:text-green-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-green-600">
              Products
            </Link>
          </li>

          {/* Contact link visible to everyone */}
          

          {isBuyer && (
            <>
            <li>
            <Link to="/contact" className="hover:text-green-600">
              Contact
            </Link>
          </li>
              <li>
                <Link to="/placeorder" className="hover:text-green-600">
                  Place Order
                </Link>
              </li>
              <li>
                <Link to="/orderstatus" className="hover:text-green-600">
                  Order Status
                </Link>
              </li>
            </>
          )}

          {isAdmin && (
            <>
              <li>
                <Link to="/add-product" className="hover:text-green-600">
                  Add Product
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/contact-messages"
                  className="hover:text-green-600"
                >
                  Contact Messages
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-green-600">
                  Get All Orders
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right-side Buttons */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">
                Hello, {user.fullname}
              </span>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
