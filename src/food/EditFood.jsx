import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditFood() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [food, setFood] = useState({ title: "", price: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    console.log("Fetching Food ID:", id);

    api.get(`/foods/${id}`)
      .then((res) => {
       
        const foodData = res.data?.data || res.data; 
        
        if (foodData) {
          setFood({ 
            title: foodData.title || "", 
            price: foodData.price || "" 
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error details:", err.response?.data || err.message);
        
        alert("Food not found or Unauthorized! ❌");
        navigate("/");
      });
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
     
      await api.patch(`/foods/${Number(id)}`, {
        title: food.title,
        price: Number(food.price),
      });
      
      alert("Food updated successfully! ✅");
      navigate("/"); 
    } catch (error) {
      console.error("Update error details:", error.response?.data);
      const errorMsg = error.response?.data?.message || "Update failed! ❌";
      alert(errorMsg);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
        <p className="font-bold text-orange-500">Loading food data...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-md p-8 mx-auto mt-10 bg-white border shadow-sm rounded-2xl">
      <h2 className="mb-6 text-2xl font-bold text-center text-slate-800">Edit Food ✏️</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-600">Food Title</label>
          <input
            className="p-3 transition-all border outline-none rounded-xl focus:ring-2 focus:ring-orange-500"
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
            className="p-3 transition-all border outline-none rounded-xl focus:ring-2 focus:ring-orange-500"
            value={food.price}
            onChange={(e) => setFood({ ...food, price: e.target.value })}
            placeholder="e.g. 500"
            required
          />
        </div>

        <button 
          type="submit"
          className="py-3 mt-4 font-bold text-white transition-all bg-orange-500 shadow-lg hover:bg-orange-600 rounded-xl active:scale-95 shadow-orange-100"
        >
          Update Food
        </button>
        <button 
          type="button"
          onClick={() => navigate("/")}
          className="py-2 text-sm font-medium text-slate-400 hover:text-slate-600"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}