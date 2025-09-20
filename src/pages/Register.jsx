import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  FaFacebook,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
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

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, message: "" };

    let strength = 0;
    let messages = [];

    // Length check
    if (password.length >= 8) strength += 1;
    else messages.push("At least 8 characters");

    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 1;
    else messages.push("One uppercase letter");

    // Lowercase check
    if (/[a-z]/.test(password)) strength += 1;
    else messages.push("One lowercase letter");

    // Number check
    if (/[0-9]/.test(password)) strength += 1;
    else messages.push("One number");

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    else messages.push("One special character");

    let strengthMessage = "";
    if (strength <= 2) strengthMessage = "Weak";
    else if (strength <= 4) strengthMessage = "Medium";
    else strengthMessage = "Strong";

    return { strength, message: strengthMessage, requirements: messages };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password strength
    if (passwordStrength.strength < 3) {
      toast.error("Password is too weak. Please make it stronger.");
      return;
    }

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

      navigate("/login");
    } catch (err) {
      toast.error(err?.msg);
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

  // Password requirement check icons
  const RequirementCheck = ({ met, text }) => (
    <div className="flex items-center gap-2">
      {met ? (
        <FaCheck className="w-3 h-3 text-green-400" />
      ) : (
        <FaTimes className="w-3 h-3 text-red-400" />
      )}
      <span className={`text-xs ${met ? "text-green-400" : "text-red-400"}`}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-mint-950 text-white font-inter flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Register Card */}
        <div className="bg-mint-900 rounded-xl p-8 border border-mint-800 shadow-lg transform transition-all duration-500 hover:shadow-xl hover:shadow-mint-900/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-nunito text-mint-200 mb-2">
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-mint-300">
                      Password strength:
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength.strength <= 2
                          ? "text-red-400"
                          : passwordStrength.strength <= 4
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {passwordStrength.message}
                    </span>
                  </div>
                  <div className="w-full bg-mint-800 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength.strength <= 2
                          ? "bg-red-500"
                          : passwordStrength.strength <= 4
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                      }}
                    ></div>
                  </div>

                  {/* Password Requirements */}
                  <div className="grid grid-cols-2 gap-2">
                    <RequirementCheck
                      met={formData.password.length >= 8}
                      text="8+ characters"
                    />
                    <RequirementCheck
                      met={/[A-Z]/.test(formData.password)}
                      text="Uppercase letter"
                    />
                    <RequirementCheck
                      met={/[a-z]/.test(formData.password)}
                      text="Lowercase letter"
                    />
                    <RequirementCheck
                      met={/[0-9]/.test(formData.password)}
                      text="Number"
                    />
                    <RequirementCheck
                      met={/[^A-Za-z0-9]/.test(formData.password)}
                      text="Special character"
                    />
                  </div>
                </div>
              )}
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
                  className={`w-full bg-mint-800 border rounded-lg py-3 px-4 pr-12 text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400 focus:border-transparent transition-all duration-200 ${
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
                      ? "border-red-500"
                      : formData.confirmPassword &&
                        formData.password === formData.confirmPassword
                      ? "border-green-500"
                      : "border-mint-700"
                  }`}
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
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    Passwords do not match
                  </p>
                )}
              {formData.confirmPassword &&
                formData.password === formData.confirmPassword && (
                  <p className="text-green-400 text-xs mt-1">Passwords match</p>
                )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting || passwordStrength.strength < 3}
              className={`w-full bg-mint-600 hover:bg-mint-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isSubmitting || passwordStrength.strength < 3
                  ? "opacity-75 cursor-not-allowed"
                  : ""
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
          <div className="grid grid-cols-1 gap-4">
            {/* Google Login */}
            <a
              href="http://localhost:9000/auth/google"
              className="flex items-center justify-center gap-2 bg-mint-800 hover:bg-mint-700 text-white py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <FcGoogle className="w-5 h-5" />
              Continue With Google
            </a>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-mint-100">
              Already have an account?{" "}
              <Link
                to="/login"
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
