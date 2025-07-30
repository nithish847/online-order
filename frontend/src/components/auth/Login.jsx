import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

const submitHandler = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/users/login",
      { email, password },
      { withCredentials: true }
    );

    if (res.data.success) {
      const { user, token } = res.data;
      dispatch(setUser({ ...user, token })); // ✅ include token
      localStorage.setItem("token", token);  // ✅ optional: persist token
      setEmail("");
      setPassword("");
      navigate("/");
    }
  } catch (error) {
    setErrorMsg(error.response?.data?.message || "Login failed");
  }
};


  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto p-6 mt-15 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form className="space-y-4" onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
          >
            Login
          </button>
        </form>

        {errorMsg && (
          <p className="text-red-600 text-center mt-4">{errorMsg}</p>
        )}

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
