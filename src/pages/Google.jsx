import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/authSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function Google() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Processing your login...");
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    const processLogin = async () => {
      try {
        // Simulate some processing time
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (token) {
          const in15Minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
          Cookies.set("accessToken", token, {
            expires: in15Minutes,
            path: "/",
          });
          dispatch(setToken(token));
          setStatus("success");
          setMessage("Login successful! Redirecting...");

          // Wait a bit to show success message
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigate("/");
          window.location.reload();
        } else {
          setStatus("error");
          setMessage("Login failed. Redirecting to login page...");

          // Wait a bit to show error message
          await new Promise((resolve) => setTimeout(resolve, 1500));
          navigate("/login");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred. Redirecting to login page...");

        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate("/login");
      }
    };

    processLogin();
  }, [navigate, dispatch, location.search]);

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      default:
        return "text-mint-300";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return (
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      case "error":
        return (
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-red-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-mint-900/20 rounded-full flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-mint-800 rounded-full flex items-center justify-center">
                <FaSpinner className="w-6 h-6 text-mint-300 animate-spin" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-mint-950 text-white font-inter flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Status Card */}
        <div className="bg-mint-900 rounded-xl p-8 border border-mint-800 shadow-lg text-center w-full">
          {/* Google Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-4">
              <FcGoogle className="w-12 h-12" />
            </div>
          </div>

          {/* Animated Status Icon */}
          {getStatusIcon()}

          {/* Status Message */}
          <h2
            className={`text-2xl font-bold font-nunito mb-4 ${getStatusColor()}`}
          >
            {status === "processing"
              ? "Processing Google Login"
              : status === "success"
              ? "Success!"
              : "Oops! Something went wrong"}
          </h2>

          <p className="text-mint-200 mb-6 leading-relaxed text-center">
            {message}
          </p>

          {/* Progress Bar */}
          {status === "processing" && (
            <div className="w-full bg-mint-800 rounded-full h-2 mb-6 overflow-hidden mx-auto">
              <div className="bg-mint-600 h-2 rounded-full animate-pulse"></div>
            </div>
          )}

          {/* Additional Info */}
          <div className="text-sm text-mint-400 text-center">
            <p>You will be redirected automatically...</p>
          </div>

          {/* Manual Redirect Button for Errors */}
          {status === "error" && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate("/login")}
                className="bg-mint-600 hover:bg-mint-500 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-mint-400">
            Secure authentication with Google
          </p>
        </div>
      </div>
    </div>
  );
}

export default Google;
