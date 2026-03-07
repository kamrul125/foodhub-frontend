import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditFood() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [food, setFood] = useState({ title: "", price: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/foods/${id}`)
      .then((res) => {
        // যদি আপনার API রেসপন্স { success: true, data: {title...} } এমন হয়
        const foodData = res.data.data || res.data; 
        setFood({ 
          title: foodData.title || "", 
          price: foodData.price || "" 
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Food not found or server error!");
        navigate("/");
      });
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // এডিট করার সময় টোকেন অটোমেটিক axios.js থেকে যাবে
      await api.patch(`/foods/${id}`, {
        title: food.title,
        price: Number(food.price),
      });
      alert("Food updated successfully! ✅");
      navigate("/"); // বা যেখানে লিস্ট দেখায় সেখানে পাঠান
    } catch (error) {
      console.error("Update error:", error.response?.data);
      alert(error.response?.data?.message || "Update failed! ❌");
    }
  };

  if (loading) return (
    <div className="flex justify-center p-10">
      <p className="font-bold text-orange-500 animate-pulse">Loading food data...</p>
    </div>
  );

  return (
    <div className="max-w-md p-8 mx-auto mt-10 bg-white border shadow-sm rounded-2xl">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">Edit Food ✏️</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-600">Food Title</label>
          <input
            className="p-3 border outline-none rounded-xl focus:ring-2 focus:ring-orange-500"
            value={food.title}
            onChange={(e) => setFood({ ...food, title: e.target.value })}
            placeholder="e.g. Delicious Pizza"
            required
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-600">Price (BDT)</label>
          <input
            type="number"
            className="p-3 border outline-none rounded-xl focus:ring-2 focus:ring-orange-500"
            value={food.price}
            onChange={(e) => setFood({ ...food, price: e.target.value })}
            placeholder="e.g. 500"
            required
          />
        </div>

        <button 
          type="submit"
          className="py-3 mt-4 font-bold text-white transition-all bg-orange-500 hover:bg-orange-600 rounded-xl active:scale-95"
        >
          Update Food
        </button>
      </form>
    </div>
  );
}