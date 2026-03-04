import { useState } from "react";
import api from "../api/axios";

export default function CreateFood() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // খাবার অ্যাড করার জন্য ব্যাকএন্ড এপিআই কল
      const response = await api.post("/foods", {
        title: formData.title,
        price: Number(formData.price), // প্রাইস অবশ্যই নাম্বার হতে হবে
      });

      if (response.status === 201 || response.status === 200) {
        setMessage(`✅ Food "${response.data.title}" added with ID: ${response.data.id}`);
        setFormData({ title: "", price: "" }); // ফর্ম খালি করা
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add food. Make sure you are logged in as SELLER.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2 style={{ color: "#2c3e50" }}>Add New Food Item</h2>
      <p style={{ fontSize: "12px", color: "#7f8c8d" }}>Only Sellers can add food</p>

      <form onSubmit={handleSubmit} style={{ textAlign: "left", marginTop: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label>Food Title:</label>
          <input
            type="text"
            placeholder="e.g. Cheese Pizza"
            value={formData.title}
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ddd" }}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Price (BDT):</label>
          <input
            type="number"
            placeholder="e.g. 250"
            value={formData.price}
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ddd" }}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#bdc3c7" : "#3498db",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            width: "100%",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Adding..." : "Add Food Item"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
          {message}
        </p>
      )}
    </div>
  );
}