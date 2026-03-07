import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ডাটা লোড করার ফাংশন
  const fetchFoods = () => {
    setLoading(true);
    api.get("/foods")
      .then((res) => {
        setFoods(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching foods:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // অর্ডার করার ফাংশন
  const handleOrder = async (foodId) => {
    try {
      const res = await api.post("/orders", {
        foodIds: [Number(foodId)],
      });
      if (res.status === 201) {
        alert("অর্ডার সফল হয়েছে! 🍕");
        navigate("/my-orders");
      }
    } catch (err) {
      alert(err.response?.data?.message || "অর্ডার করতে সমস্যা হয়েছে।");
    }
  };

  // খাবার ডিলিট করার ফাংশন
  const handleDelete = async (foodId) => {
    if (window.confirm("আপনি কি নিশ্চিতভাবে এই খাবারটি ডিলিট করতে চান?")) {
      try {
        await api.delete(`/foods/${foodId}`);
        alert("খাবারটি সফলভাবে ডিলিট হয়েছে!");
        fetchFoods(); // ডিলিট করার পর লিস্ট আপডেট করা
      } catch (err) {
        alert("ডিলিট করতে সমস্যা হয়েছে। সম্ভবত এটি আপনার যোগ করা খাবার নয়।");
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="w-12 h-12 border-t-2 border-b-2 border-orange-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800">🍕 Available Foods</h2>
        <button 
          onClick={() => navigate("/add-food")} 
          className="px-4 py-2 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
        >
          + Add New Food
        </button>
      </div>

      {foods.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed bg-slate-50 rounded-2xl border-slate-200">
          <p className="text-lg text-slate-500">No food items found at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {foods.map((f) => (
            <div key={f.id} className="overflow-hidden transition-all duration-300 bg-white border shadow-sm group rounded-2xl border-slate-100 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold transition-colors text-slate-800 group-hover:text-orange-600">
                    {f.title}
                  </h3>
                </div>
                
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-slate-900">{f.price}</span>
                      <span className="ml-1 text-sm font-bold text-slate-400">BDT</span>
                    </div>
                    <button 
                      onClick={() => handleOrder(f.id)}
                      className="px-4 py-2 font-bold text-white transition-all bg-green-500 hover:bg-green-600 rounded-xl active:scale-95"
                    >
                      Order Now
                    </button>
                  </div>

                  {/* সেলারদের জন্য এডিট এবং ডিলিট বাটন */}
                  <div className="flex gap-2 pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => navigate(`/edit-food/${f.id}`)}
                      className="flex-1 px-3 py-2 text-sm font-bold text-blue-600 rounded-lg bg-blue-50 hover:bg-blue-100"
                    >
                      Edit ✏️
                    </button>
                    <button 
                      onClick={() => handleDelete(f.id)}
                      className="flex-1 px-3 py-2 text-sm font-bold text-red-600 rounded-lg bg-red-50 hover:bg-red-100"
                    >
                      Delete 🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}