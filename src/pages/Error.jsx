import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSearch, FaExclamationTriangle } from "react-icons/fa";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mint-950 text-white font-inter flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center">
        {/* Animated Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-mint-800 rounded-full flex items-center justify-center animate-pulse">
              <FaExclamationTriangle className="w-16 h-16 text-mint-300" />
            </div>
            <div className="absolute -inset-4 bg-mint-700 rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-9xl font-bold font-nunito text-mint-200 mb-4">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl font-bold font-nunito text-mint-100 mb-6">
          Page Not Found
        </h2>

        <p className="text-mint-200 mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have drifted away with the
          tide. It might have been moved, deleted, or never existed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-mint-600 hover:bg-mint-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaHome className="w-5 h-5" />
            Go Home
          </button>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-mint-800 hover:bg-mint-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaSearch className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="bg-mint-900 rounded-lg p-6 border border-mint-800">
          <h3 className="text-lg font-semibold font-nunito text-mint-100 mb-3">
            Need Help?
          </h3>
          <p className="text-mint-200 text-sm mb-4">
            If you keep encountering this issue, please contact support.
          </p>
          <Link
            to="/contact"
            className="text-mint-400 hover:text-mint-300 text-sm transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
