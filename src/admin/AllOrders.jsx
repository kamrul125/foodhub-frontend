import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching all orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading All Orders...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ color: "#c0392b", borderBottom: "2px solid #c0392b", paddingBottom: "10px" }}>
        👑 Admin Panel: All Customer Orders
      </h2>
      
      {orders.length === 0 ? (
        <p>No orders found in the system.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <thead>
            <tr style={{ backgroundColor: "#2c3e50", color: "white", textAlign: "left" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Order ID</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Customer Info</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Foods</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Total Amount</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>#{order.id}</td>
                <td style={{ padding: "12px" }}>
                  <strong>{order.user?.name || "Unknown"}</strong><br/>
                  <small style={{ color: "#7f8c8d" }}>{order.user?.email}</small>
                </td>
                <td style={{ padding: "12px" }}>
                  {order.foods?.map(f => f.title).join(", ") || "No items"}
                </td>
                <td style={{ padding: "12px", fontWeight: "bold" }}>{order.totalAmount} BDT</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ 
                    padding: "4px 8px", 
                    borderRadius: "4px", 
                    fontSize: "12px",
                    backgroundColor: order.status === "PENDING" ? "#fff3cd" : "#d4edda",
                    color: order.status === "PENDING" ? "#856404" : "#155724"
                  }}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}