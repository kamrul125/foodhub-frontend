import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateFood() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Pizza",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/foods", {
        ...formData,
        price: Number(formData.price), 
      });

      if (response.status === 201 || response.status === 200) {
        alert(`✅ Food "${formData.title}" added successfully!`);
        navigate("/"); 
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add food. Make sure you are logged in as SELLER.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white border border-gray-100 shadow-xl rounded-2xl">
        <h2 className="mb-2 text-3xl font-extrabold text-center text-gray-800">Add New Food</h2>
        <p className="mb-8 text-sm text-center text-gray-500">List your delicious food for customers</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Food Title */}
          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700">Food Title</label>
            <input
              type="text"
              placeholder="e.g. Cheese Pizza"
              className="w-full px-4 py-3 transition-all border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-orange-500"
              value={formData.title}
              required
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block mb-1 text-sm font-bold text-gray-700">Price (BDT)</label>
              <input
                type="number"
                placeholder="250"
                className="w-full px-4 py-3 transition-all border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-orange-500"
                value={formData.price}
                required
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            {/* Category */}
            <div>
              <label className="block mb-1 text-sm font-bold text-gray-700">Category</label>
              <select
                className="w-full px-4 py-3 transition-all border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-orange-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Pizza">Pizza</option>
                <option value="Burger">Burger</option>
                <option value="Drinks">Drinks</option>
                <option value="Pasta">Pasta</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-bold text-gray-700">Description</label>
            <textarea
              placeholder="Describe your food item..."
              className="w-full px-4 py-3 transition-all border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-orange-500"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700 hover:-translate-y-1"
            }`}
          >
            {loading ? "Adding Food..." : "Add Food Item"}
          </button>
        </form>
      </div>
    </div>
  );
}