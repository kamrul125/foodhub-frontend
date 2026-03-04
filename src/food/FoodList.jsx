import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/foods")
      .then((res) => {
        setFoods(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching foods:", err);
        setLoading(false);
      });
  }, []);

  // ১. নির্দিষ্ট খাবার অর্ডার করার ফাংশন
  const handleOrder = async (foodId) => {
    try {
      const res = await api.post("/orders", {
        foodIds: [Number(foodId)], // ক্লিক করা খাবারের আইডি পাঠানো হচ্ছে
      });

      if (res.status === 201) {
        alert("অর্ডার সফল হয়েছে! 🍕");
        navigate("/my-orders"); // সরাসরি মাই অর্ডার পেজে নিয়ে যাবে
      }
    } catch (err) {
      console.error("Order error:", err);
      alert(err.response?.data?.message || "অর্ডার করতে সমস্যা হয়েছে। আগে লগইন আছে কি না চেক করুন।");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading foods...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "#2c3e50" }}>🍕 Available Foods</h2>
        <button 
          onClick={handleLogout}
          style={{ 
            backgroundColor: "#ff4d4d", 
            color: "white", 
            padding: "8px 15px", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>

      <hr style={{ border: "0.5px solid #eee", margin: "20px 0" }} />

      {foods.length === 0 ? (
        <p>No food items found.</p>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {foods.map((f) => (
            <div key={f.id} style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "15px", 
              border: "1px solid #eee",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}>
              <div>
                <strong style={{ fontSize: "18px" }}>{f.title}</strong> 
                <p style={{ margin: "5px 0", color: "#27ae60", fontWeight: "bold" }}>{f.price} BDT</p>
              </div>

              {/* ✅ ২. এই বাটনটিই এখন তোমার পছন্দমতো অর্ডার করবে */}
              <button 
                onClick={() => handleOrder(f.id)}
                style={{
                  backgroundColor: "#27ae60",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.3s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#219150"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#27ae60"}
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}