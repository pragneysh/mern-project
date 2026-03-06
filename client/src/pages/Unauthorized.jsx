import React from "react";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 sm:p-10 text-center max-w-md w-full">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <ShieldAlert size={40} className="text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          401 Unauthorized
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          You don't have permission to access this page.  
          Please login with the correct account or go back to the homepage.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-1/2 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-medium"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-1/2 py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}