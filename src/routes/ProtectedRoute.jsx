import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token"); // টোকেন চেক করা জরুরি
  const userRole = localStorage.getItem("role");

  // ১. যদি টোকেন না থাকে, সরাসরি লগইন পেজে পাঠান
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ২. যদি রোল দেওয়া থাকে এবং ইউজারের রোল না মিলে, তবে হোমে পাঠান
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  // ৩. সব ঠিক থাকলে কাঙ্ক্ষিত পেজ দেখান
  return children;
}