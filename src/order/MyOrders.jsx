import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        // ✅ ব্যাকএন্ড রাউট অনুযায়ী সঠিক URL
        const response = await api.get("/orders/me"); 
        console.log("My Orders Data:", response.data);
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading your orders...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
        📦 My Orders
      </h2>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#7f8c8d", border: "1px dashed #ccc", borderRadius: "10px" }}>
          <p>You haven't placed any orders yet.</p>
          <p style={{ fontSize: "14px", color: "#3498db" }}>নতুন একটি অর্ডার দিয়ে আবার চেক করুন।</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {orders.map((order) => (
            <div key={order.id} style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                 <p style={{ margin: "0", fontWeight: "bold", color: "#34495e" }}>Order ID: #{order.id}</p>
                 <small style={{ color: "#95a5a6" }}>{new Date(order.createdAt).toLocaleDateString()}</small>
              </div>
              
              {/* ✅ এখানে f.name পরিবর্তন করে f.title করা হয়েছে */}
              <div style={{ margin: "10px 0", fontSize: "15px", color: "#555" }}>
                <strong>Items:</strong> {order.foods && order.foods.length > 0 
                  ? order.foods.map(f => f.title).join(", ") 
                  : "No items found"}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", borderTop: "1px solid #f9f9f9", paddingTop: "10px" }}>
                <span style={{ fontSize: "16px" }}>Total: <strong style={{ color: "#e67e22" }}>{order.totalAmount} BDT</strong></span>
                <span style={{
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  backgroundColor: order.status === "DELIVERED" ? "#d4edda" : "#fff3cd",
                  color: order.status === "DELIVERED" ? "#155724" : "#856404"
                }}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}