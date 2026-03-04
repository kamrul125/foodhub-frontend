import { useState, useEffect } from "react";
import api from "../api/axios";

export default function CreateOrder() {
  const [foods, setFoods] = useState([]); // খাবারের লিস্ট রাখার জন্য
  const [selectedFoodId, setSelectedFoodId] = useState("");
  const [loading, setLoading] = useState(false);

  // ১. সব খাবারের লিস্ট লোড করা
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await api.get("/foods");
        setFoods(response.data);
        if (response.data.length > 0) setSelectedFoodId(response.data[0].id);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();
  }, []);

  const handleOrder = async () => {
    if (!selectedFoodId) return alert("Please select a food first!");
    
    setLoading(true);
    try {
      const payload = {
        foodIds: [Number(selectedFoodId)], // ড্রপডাউন থেকে আসা আইডি
        totalAmount: 200, 
        address: "Dhaka, Bangladesh",
        phone: "017XXXXXXXX"
      };

      const response = await api.post("/orders", payload);
      if (response.status === 201 || response.status === 200) {
        alert("🎉 Order placed successfully!");
      }
    } catch (err) {
      alert("❌ Failed: " + (err.response?.data?.message || "Error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Confirm Your Order</h2>
      
      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <label>Select Food Item:</label>
        <select 
          value={selectedFoodId} 
          onChange={(e) => setSelectedFoodId(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          {foods.length === 0 ? <option>No food available</option> : 
            foods.map(f => (
              <option key={f.id} value={f.id}>{f.title} - {f.price} BDT</option>
            ))
          }
        </select>
      </div>

      <button 
        onClick={handleOrder} 
        disabled={loading || foods.length === 0}
        style={{
          backgroundColor: "#27ae60", color: "white", padding: "15px", 
          width: "100%", border: "none", borderRadius: "8px", cursor: "pointer"
        }}
      >
        {loading ? "Placing Order..." : "Place Order Now"}
      </button>
    </div>
  );
}