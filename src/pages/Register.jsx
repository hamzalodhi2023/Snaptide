import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await dispatch(registerUser(formData)).unwrap();

      toast.success("Registered successfully!", {
        duration: 1000,
      });

      navigate("/login"); // or wherever you want
    } catch (err) {
      // ✅ Better error fallback
      toast.error(err?.message || "Registration failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-mint-950 text-white font-inter flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Register Card */}
        <div className="bg-mint-900 rounded-xl p-8 border border-mint-800 shadow-lg transform transition-all duration-500 hover:shadow-xl hover:shadow-mint-900/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-nunito text-mint-200 mb-2 animate-pulse">
              Create Account
            </h1>
            <p className="text-mint-100">Join us and start your journey</p>
          </div>

          {/* Register Form */}
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-6"
          >
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-mint-100 mb-2 font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  autoComplete="off"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-mint-800 border border-mint-700 rounded-lg py-3 px-4 text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400 focus:border-transparent transition-all duration-200"
                  placeholder="First name"
                  required
                  name="firstName"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-mint-100 mb-2 font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-mint-800 border border-mint-700 rounded-lg py-3 px-4 text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400 focus:border-transparent transition-all duration-200"
                  placeholder="Last name"
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-mint-100 mb-2 font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-mint-800 border border-mint-700 rounded-lg py-3 px-4 text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
                autoComplete="off"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-mint-100 mb-2 font-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-mint-800 border border-mint-700 rounded-lg py-3 px-4 pr-12 text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400 focus:border-transparent transition-all duration-200"
                  placeholder="Create password"
                  required
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mint-400 hover:text-mint-300 transition-colors duration-200"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-mint-100 mb-2 font-medium"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-mint-800 border border-mint-700 rounded-lg py-3 px-4 pr-12 text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm password"
                  required
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mint-400 hover:text-mint-300 transition-colors duration-200"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-mint-600 hover:bg-mint-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center my-8">
            <div className="flex-grow border-t border-mint-700"></div>
            <span className="flex-shrink mx-4 text-mint-400 text-sm">
              or sign up with
            </span>
            <div className="flex-grow border-t border-mint-700"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {/* Google Login */}
            <a
              href="http://localhost:9000/auth/google"
              className="flex items-center justify-center gap-2 bg-mint-800 hover:bg-mint-700 text-white py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <FcGoogle className="w-5 h-5" />
              Google
            </a>

            {/* Facebook Login */}
            <button className="flex items-center justify-center gap-2 bg-mint-800 hover:bg-mint-700 text-white py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
              <FaFacebook className="w-5 h-5 text-blue-400" />
              Facebook
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-mint-100">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-mint-400 hover:text-mint-300 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
