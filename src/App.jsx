import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import FoodList from "./food/FoodList";
import CreateOrder from "./order/CreateOrder";
import MyOrders from "./order/MyOrders";
import AllOrders from "./admin/AllOrders";
import CreateFood from "./food/CreateFood"; 
import ProtectedRoute from "./routes/ProtectedRoute";


import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
     
      <div className="flex flex-col min-h-screen bg-[#f8fafc] font-['Inter']">
        
       
        <header className="sticky top-0 shadow-sm z-1000">
          <Navbar /> 
        </header>

     
        <main className="flex justify-center flex-1 px-4 py-12 md:px-6">
          
          <div className="w-full p-6 bg-white border shadow-xl max-w-7xl md:p-10 rounded-2xl shadow-slate-200/50 border-slate-200">
            
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