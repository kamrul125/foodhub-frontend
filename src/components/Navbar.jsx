import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const handleLogout = () => {
   
    localStorage.clear(); 
    
    
    navigate('/login');

    
    window.location.reload();
  };

  return (
    <nav className="w-full px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        
        {/* লোগো */}
        <Link to="/" className="text-2xl italic font-bold text-orange-600 transition hover:opacity-80">
          FoodHub
        </Link>

        {/* মেনু আইটেমসমূহ (ডেস্কটপ ভিউ) */}
        <div className="items-center hidden space-x-8 font-medium text-gray-700 md:flex">
          <Link to="/" className="transition duration-300 hover:text-orange-600">
            Home
          </Link>

         
          {token && user?.role === 'USER' && (
            <>
              <Link to="/order" className="transition duration-300 hover:text-orange-600">Order Food</Link>
              <Link to="/my-orders" className="transition duration-300 hover:text-orange-600">My Orders</Link>
            </>
          )}

          {token && user?.role === 'SELLER' && (
            <Link to="/create-food" className="transition duration-300 hover:text-orange-600">Add Food</Link>
          )}

          {token && user?.role === 'ADMIN' && (
            <Link to="/admin/orders" className="transition duration-300 hover:text-orange-600">Admin Dashboard</Link>
          )}
        </div>

        {/* লগইন/লগআউট সেকশন */}
        <div className="flex items-center space-x-4">
          {token && user ? (
            <div className="flex items-center space-x-4">
              <span className="hidden text-sm font-semibold text-gray-500 sm:inline">
                Hi, {user.name || 'User'}
              </span>
              <button 
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-medium text-white transition-all duration-300 bg-red-500 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg active:scale-95"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="font-medium text-gray-700 hover:text-orange-600">
                Login
              </Link>
              <Link to="/register" className="px-5 py-2 text-sm font-medium text-white transition-all duration-300 bg-orange-600 rounded-lg shadow-md hover:bg-orange-700 hover:shadow-lg active:scale-95">
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