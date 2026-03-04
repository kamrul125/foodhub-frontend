import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // LocalStorage থেকে ইউজার ডাটা নিচ্ছি (তোমার প্রজেক্টের লজিক অনুযায়ী এটি পরিবর্তন হতে পারে)
  const user = JSON.parse(localStorage.getItem('user')); 

  const handleLogout = () => {
    localStorage.removeItem('user'); // বা তোমার টোকেন রিমুভ করার লজিক
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* লোগো */}
        <Link to="/" className="text-2xl font-bold text-orange-600 italic">
          FoodHub
        </Link>

        {/* মেনু আইটেমসমূহ */}
        <div className="hidden md:flex space-x-8 items-center font-medium text-gray-700">
          <Link href="/" className="hover:text-orange-600 transition">Home</Link>

          {/* ইউজার রোল অনুযায়ী আলাদা মেনু */}
          {user?.role === 'USER' && (
            <>
              <Link to="/order" className="hover:text-orange-600 transition">Order Food</Link>
              <Link to="/my-orders" className="hover:text-orange-600 transition">My Orders</Link>
            </>
          )}

          {user?.role === 'SELLER' && (
            <Link to="/create-food" className="hover:text-orange-600 transition">Add Food</Link>
          )}

          {user?.role === 'ADMIN' && (
            <Link to="/admin/orders" className="hover:text-orange-600 transition">Admin Dashboard</Link>
          )}
        </div>

        {/* লগইন/লগআউট বাটন */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-500">Hi, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-orange-600">Login</Link>
              <Link to="/register" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition text-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;