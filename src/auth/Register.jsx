import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); 
    
    try {
      // এপিআই কল করার সময় আপনার ব্যাকএন্ডের রাউট অনুযায়ী চেক করে নিন
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      alert("Registration Successful!");
      navigate("/login"); 
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50">
      {/* মেইন কার্ড ডিজাইন */}
      <div className="w-full max-w-md p-10 space-y-8 bg-white border border-gray-100 shadow-2xl rounded-2xl">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-center text-orange-600">
            FoodHub
          </h2>
          <p className="mt-2 text-sm text-center text-gray-500">
            Create an account to get started
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4 rounded-md">
            {/* Name Input */}
            <div>
              <label className="block ml-1 text-sm font-bold text-gray-700">Full Name</label>
              <input
                type="text"
                required
                className="block w-full px-4 py-3 mt-1 transition-all border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            {/* Email Input */}
            <div>
              <label className="block ml-1 text-sm font-bold text-gray-700">Email Address</label>
              <input
                type="email"
                required
                className="block w-full px-4 py-3 mt-1 transition-all border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block ml-1 text-sm font-bold text-gray-700">Password</label>
              <input
                type="password"
                required
                className="block w-full px-4 py-3 mt-1 transition-all border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block ml-1 text-sm font-bold text-gray-700">Join As</label>
              <select
                className="block w-full px-4 py-3 mt-1 bg-white border border-gray-300 shadow-sm outline-none cursor-pointer rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">Customer</option>
                <option value="SELLER">Seller / Provider</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex justify-center w-full px-4 py-3 text-base font-bold text-white transition-all duration-200 transform bg-orange-600 border border-transparent shadow-lg rounded-xl hover:bg-orange-700 hover:-translate-y-1"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-orange-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}