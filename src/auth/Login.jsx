import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

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
      
      // ✅ ২. রোল অনুযায়ী সঠিক পেজে পাঠানো (এই অংশটুকু পরিবর্তন করা হয়েছে)
      const userRole = res.data.user.role;

      if (userRole === "ADMIN") {
        navigate("/admin/orders"); // অ্যাডমিন যাবে সব অর্ডারের লিস্টে
      } else if (userRole === "SELLER") {
        navigate("/create-food");  // সেলার যাবে খাবার অ্যাড করার পেজে
      } else {
        navigate("/");             // সাধারণ ইউজার যাবে খাবারের লিস্ট দেখতে
      }

      // ৩. স্টেট রিফ্রেশ নিশ্চিত করতে (অপশনাল কিন্তু কার্যকরী)
      window.location.reload();

    } catch (error) {
      alert(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ color: "#2c3e50" }}>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <button type="submit" style={{ 
          padding: "12px", 
          backgroundColor: "#3498db", 
          color: "white", 
          border: "none", 
          borderRadius: "5px", 
          cursor: "pointer",
          fontWeight: "bold"
        }}>
          Login
        </button>
      </form>
    </div>
  );
}