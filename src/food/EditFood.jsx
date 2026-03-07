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
        setFood({ title: res.data.title, price: res.data.price });
        setLoading(false);
      })
      .catch((err) => {
        alert("Food not found!");
        navigate("/");
      });
  }, [id, navigate]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/foods/${id}`, {
        title: food.title,
        price: Number(food.price),
      });
      alert("Food updated successfully!");
      navigate("/"); 
    } catch (error) {
     
      alert(error.response?.data?.message || "Update failed!");
    }
  };

  if (loading) return <p>Loading food data...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Food</h2>
      <form onSubmit={handleUpdate}>
        <input
          value={food.title}
          onChange={(e) => setFood({ ...food, title: e.target.value })}
          placeholder="Food Title"
          required
        />
        <br /><br />
        <input
          type="number"
          value={food.price}
          onChange={(e) => setFood({ ...food, price: e.target.value })}
          placeholder="Price"
          required
        />
        <br /><br />
        <button type="submit">Update Food</button>
      </form>
    </div>
  );
}