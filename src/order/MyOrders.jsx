import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await api.get("/orders/me");
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="w-10 h-10 border-t-2 border-b-2 border-orange-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">📦</span>
        <h2 className="text-3xl font-extrabold text-slate-800">My Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="py-16 text-center bg-white border-2 border-dashed rounded-3xl border-slate-200">
          <p className="mb-2 text-lg text-slate-500">You haven't placed any orders yet.</p>
          <p className="italic font-medium text-orange-600">নতুন একটি অর্ডার দিয়ে আবার চেক করুন।</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="p-6 transition-shadow bg-white border shadow-sm rounded-2xl border-slate-100 hover:shadow-md">
              {/* Order Header */}
              <div className="flex items-start justify-between pb-4 mb-4 border-b border-slate-50">
                <div>
                  <p className="text-sm font-bold tracking-wider text-orange-600 uppercase">Order #{order.id}</p>
                  <p className="mt-1 text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString('bn-BD')} | {new Date(order.createdAt).toLocaleTimeString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${
                  order.status === "DELIVERED" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {order.status}
                </span>
              </div>

              {/* Items List */}
              <div className="mb-6">
                <p className="mb-2 text-sm font-semibold uppercase text-slate-500">Items Ordered:</p>
                <div className="flex flex-wrap gap-2">
                  {order.foods && order.foods.length > 0 ? (
                    order.foods.map((f, idx) => (
                      <span key={idx} className="px-3 py-1 text-sm border rounded-lg bg-slate-50 text-slate-700 border-slate-100">
                        {f.title}
                      </span>
                    ))
                  ) : (
                    <span className="italic text-slate-400">No items found</span>
                  )}
                </div>
              </div>

              {/* Order Footer */}
              <div className="flex items-center justify-between p-4 -mx-6 -mb-6 bg-slate-50 rounded-b-2xl">
                <span className="text-sm font-medium text-slate-600">Amount Paid:</span>
                <span className="text-xl font-black text-slate-900">{order.totalAmount} <span className="text-xs font-normal">BDT</span></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}