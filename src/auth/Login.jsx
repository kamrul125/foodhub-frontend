import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      // ১. ডাটা সেভ করা
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login success!");

      // ✅ ২. রোল অনুযায়ী সঠিক পেজে পাঠানো
      const userRole = res.data.user.role;

      if (userRole === "ADMIN") {
        navigate("/admin/orders");
      } else if (userRole === "SELLER") {
        navigate("/create-food");
      } else {
        navigate("/");
      }

      // ৩. স্টেট রিফ্রেশ নিশ্চিত করতে
      window.location.reload();

    } catch (error) {
      alert(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-10 space-y-8 bg-white border border-gray-100 shadow-xl rounded-2xl">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-center text-orange-600">
            FoodHub
          </h2>
          <p className="mt-2 text-sm font-medium text-center text-gray-500">
            Please log in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md">
            {/* Email Field */}
            <div>
              <label className="block ml-1 text-sm font-bold text-gray-700">Email Address</label>
              <input
                type="email"
                required
                className="block w-full px-4 py-3 mt-1 transition-all border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block ml-1 text-sm font-bold text-gray-700">Password</label>
              <input
                type="password"
                required
                className="block w-full px-4 py-3 mt-1 transition-all border border-gray-300 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-3 text-base font-bold text-white transition-all duration-200 transform bg-orange-600 border border-transparent shadow-lg group rounded-xl hover:bg-orange-700 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-orange-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}