import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
    setIsSubmitting(true);

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Handle login logic here
    console.log("Login attempt:", formData);
    setIsSubmitting(false);
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login");
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
    console.log("Facebook login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-mint-950 text-white font-inter flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-mint-900 rounded-xl p-8 border border-mint-800 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-nunito text-mint-200 mb-2">
              Welcome Back
            </h1>
            <p className="text-mint-100">Sign in to access your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-mint-100 font-medium"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-mint-400 hover:text-mint-300 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-mint-800 border border-mint-700 rounded-lg py-3 px-4 pr-12 text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
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

            {/* Login Button */}
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
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center my-8">
            <div className="flex-grow border-t border-mint-700"></div>
            <span className="flex-shrink mx-4 text-mint-400 text-sm">
              or continue with
            </span>
            <div className="flex-grow border-t border-mint-700"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {/* Google Login */}
            <a
              href="http://localhost:9000/auth/google"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 bg-mint-800 hover:bg-mint-700 text-white py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <FcGoogle className="w-5 h-5" />
              Google
            </a>

            {/* Facebook Login */}
            <button
              onClick={handleFacebookLogin}
              className="flex items-center justify-center gap-2 bg-mint-800 hover:bg-mint-700 text-white py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <FaFacebook className="w-5 h-5 text-blue-400" />
              Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-mint-100">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-mint-400 hover:text-mint-300 font-medium transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
