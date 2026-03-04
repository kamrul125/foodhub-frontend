import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* লোগো এবং ডেসক্রিপশন */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-4 italic">FoodHub</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            আপনার পছন্দের সব খাবার এখন এক ক্লিকেই! আমরা দিচ্ছি দ্রুত ডেলিভারি আর সেরা স্বাদের নিশ্চয়তা।
          </p>
        </div>

        {/* কুইক লিংকস */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-orange-500 inline-block">Quick Links</h3>
          <ul className="text-gray-400 space-y-2 mt-2">
            <li><a href="/" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="/login" className="hover:text-orange-500 transition">Login</a></li>
            <li><a href="/register" className="hover:text-orange-500 transition">Register</a></li>
          </ul>
        </div>

        {/* কন্টাক্ট ইনফো */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b-2 border-orange-500 inline-block">Contact Us</h3>
          <p className="text-gray-400 text-sm mt-2">Dhanmondi, Dhaka, Bangladesh</p>
          <p className="text-gray-400 text-sm">Email: support@foodhub.com</p>
          <p className="text-gray-400 text-sm">Phone: +880 1234 567 890</p>
        </div>

      </div>

      {/* কপিরাইট অংশ */}
      <div className="border-t border-gray-800 mt-10 pt-5 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} FoodHub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;