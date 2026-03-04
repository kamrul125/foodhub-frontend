import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import FoodList from "./food/FoodList";
import CreateOrder from "./order/CreateOrder";
import MyOrders from "./order/MyOrders";
import AllOrders from "./admin/AllOrders";
import CreateFood from "./food/CreateFood"; 
import ProtectedRoute from "./routes/ProtectedRoute";

// নতুন পাথ অনুযায়ী ইমপোর্ট (components ফোল্ডার থেকে)
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      {/* মেইন লেআউট কন্টেইনার */}
      <div className="flex flex-col min-h-screen bg-[#f8fafc] font-['Inter']">
        
        {/* শ্যাডোসহ স্টিকি ন্যাভবার (z-[1000] ব্যবহার করা হয়েছে) */}
        <header className="sticky top-0 z-1000 shadow-sm">
          <Navbar /> 
        </header>

        {/* মেইন কন্টেন্ট এরিয়া */}
        <main className="flex-1 flex justify-center py-12 px-4 md:px-6">
          
          <div className="w-full max-w-7xl bg-white p-6 md:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200">
            
            <Routes>
              {/* ১. পাবলিক রাউট */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* ২. প্রোটেক্টেড রাউট - হোমপেজ */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <FoodList />
                  </ProtectedRoute>
                } 
              />

              {/* ৩. সেলার রাউট */}
              <Route
                path="/create-food"
                element={
                  <ProtectedRoute role="SELLER">
                    <CreateFood />
                  </ProtectedRoute>
                }
              />

              {/* ৪. কাস্টমার রাউট */}
              <Route
                path="/order"
                element={
                  <ProtectedRoute role="USER">
                    <CreateOrder />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/my-orders"
                element={
                  <ProtectedRoute role="USER">
                    <MyOrders />
                  </ProtectedRoute>
                }
              />

              {/* ৫. অ্যাডমিন রাউট */}
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute role="ADMIN">
                    <AllOrders />
                  </ProtectedRoute>
                }
              />

              {/* ভুল ইউআরএল-এর জন্য রিডাইরেক্ট */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        {/* ফুটার */}
        <Footer /> 
      </div>
    </BrowserRouter>
  );
}