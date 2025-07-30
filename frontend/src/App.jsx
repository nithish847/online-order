import { Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Contact from "./components/shared/Contact";
import About from "./components/About";
import Product from "./components/Product";
import AddProduct from "./components/admin/AddProduct";
import Orders from "./components/admin/Orders";
import Logout from "./components/auth/Logout";
import PlaceOrder from "./components/PlaceOrder";
import MyOrders from "./components/MyOrder";
import OrderedProducts from "./components/OrderedProducts";
import AdminContactMessages from "./components/admin/AdminContactMessages";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route path="/add-product" element={<AddProduct />} />
       <Route path="/place-order/:id" element={<PlaceOrder />} />
      <Route path="/placeorder" element={<OrderedProducts />} /> 
       <Route path="/admin/contact-messages" element={<AdminContactMessages/>} />

        <Route path="/orderstatus" element={<MyOrders />} /> {/* ✅ ADD this */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/logout" element={<Logout />} />



      </Routes>
    </>
  );
}

export default App;
