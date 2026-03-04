import api from "../api/axios";

export default function Register() {
  const register = async () => {
    await api.post("/auth/register", {
      name: "User One",
      email: "user1@gmail.com",
      password: "123456",
      role: "USER",
    });
    alert("Registered");
  };

  return <button onClick={register}>Register USER</button>;
}