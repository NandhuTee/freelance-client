// src/pages/Success.jsx
import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold text-green-700 mb-4">✅ Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your order. The freelancer will contact you soon.</p>
        <Link
          to="/gigs"
          className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Browse More Gigs
        </Link>
      </div>
    </div>
  );
};

export default Success;
