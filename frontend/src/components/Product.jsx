import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
    else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
  }
  return stars;
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/allproducts");
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-green-800 mb-12 text-center tracking-wide">
          Fresh Fruits & Vegetables Available Now
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              >
                <div className="relative h-48 overflow-hidden rounded-t-xl bg-gradient-to-tr from-green-200 to-green-400">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />

                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      product.category === "Fruit"
                        ? "bg-red-200 text-red-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {product.category}
                  </span>

                  <span className="absolute top-3 right-3 bg-green-900 text-white px-3 py-1 rounded-lg font-semibold text-sm shadow-lg">
                    ₹{product.price}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold text-green-900">{product.name}</h3>

                  <div className="flex space-x-1 mt-1">{renderStars(product.rating || 0)}</div>

                  <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  <button
                    onClick={() => navigate(`/place-order/${product._id}`)}
                    className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
