import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // সব অর্ডার ফেচ করা
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching all orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // স্ট্যাটাস আপডেট করার ফাংশন
  const handleUpdateStatus = async (orderId, currentStatus) => {
    const nextStatus = currentStatus === "PENDING" ? "DELIVERED" : "PENDING";
    try {
      await api.patch(`/orders/${orderId}`, { status: nextStatus });
      alert(`Order #${orderId} marked as ${nextStatus}`);
      fetchOrders(); 
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="w-10 h-10 border-t-2 border-b-2 border-red-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <div className="pb-4 mb-8 border-b-4 border-red-600">
        <h2 className="text-3xl font-black tracking-tight uppercase text-slate-800">
          👑 Admin Panel: All Orders
        </h2>
      </div>

      {orders.length === 0 ? (
        <div className="py-20 text-center bg-white shadow-inner rounded-2xl">
          <p className="text-lg italic text-slate-400">No orders found in the system.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border shadow-xl rounded-2xl border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm tracking-wider text-white uppercase bg-slate-800">
                <th className="p-4 font-bold">ID</th>
                <th className="p-4 font-bold">Customer</th>
                <th className="p-4 font-bold">Foods</th>
                <th className="p-4 font-bold">Amount</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-slate-50">
                  <td className="p-4 font-mono text-xs text-slate-500">#{order.id}</td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{order.user?.name || "Guest"}</p>
                    <p className="text-xs text-slate-400">{order.user?.email}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {order.foods?.map((f, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200">
                          {f.title}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-black text-slate-700">{order.totalAmount} BDT</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === "DELIVERED" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleUpdateStatus(order.id, order.status)}
                      className="px-3 py-2 text-xs font-bold transition-all border rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 border-slate-300"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}