import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, loginUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forgotLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Check for existing cooldown on component mount
  useEffect(() => {
    const forgotPasswordCooldown = Cookies.get("forgotPasswordCooldown");
    if (forgotPasswordCooldown) {
      const remainingTime = Math.max(
        0,
        parseInt(forgotPasswordCooldown) - Math.floor(Date.now() / 1000)
      );
      if (remainingTime > 0) {
        setCooldown(remainingTime);
      } else {
        Cookies.remove("forgotPasswordCooldown");
      }
    }
  }, []);

  // Timer effect for cooldown
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            Cookies.remove("forgotPasswordCooldown");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

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

    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      toast.success("Login successful!");
      navigate("/");
      window.location.reload();
    } catch (err) {
      toast.error(err?.message || "Login failed.");

      // 🔍 Check if the accountVerificationToken is available in Redux
      if (err?.token && err?.isVerified === false) {
        navigate(`/verify-account?token=${err.token}`);
        toast.info("OTP send to your email");
      }
    } finally {
      setIsSubmitting(false);
      setFormData({ email: "", password: "" });
    }
  };

  const handleForgot = async () => {
    if (!formData.email) {
      toast.error("Please enter your email first.");
      return;
    }

    if (cooldown > 0) {
      toast.info(
        `Please wait ${formatTime(
          cooldown
        )} before requesting another reset email.`
      );
      return;
    }

    try {
      const res = await dispatch(forgotPassword(formData.email)).unwrap();
      toast.success(res.message || "Password reset email sent!");

      // Set cooldown in cookie (3 minutes = 180 seconds)
      const cooldownEndTime = Math.floor(Date.now() / 1000) + 180;
      Cookies.set("forgotPasswordCooldown", cooldownEndTime.toString(), {
        expires: new Date(Date.now() + 180 * 1000), // 3 minutes
        secure: true,
        sameSite: "strict",
      });

      setCooldown(180);
    } catch (err) {
      toast.error(err || "Failed to send reset email");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
                <div className="flex items-center gap-2">
                  {cooldown > 0 && (
                    <span className="text-sm text-mint-400 flex items-center gap-1">
                      <FaClock className="w-3 h-3" />
                      {formatTime(cooldown)}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleForgot}
                    disabled={forgotLoading || cooldown > 0}
                    className={`text-sm transition-colors ${
                      cooldown > 0
                        ? "text-mint-600 cursor-not-allowed"
                        : forgotLoading
                        ? "text-mint-600 cursor-not-allowed"
                        : "text-mint-400 hover:text-mint-300"
                    }`}
                  >
                    {forgotLoading
                      ? "Sending..."
                      : cooldown > 0
                      ? "Resend in"
                      : "Forgot Password?"}
                  </button>
                </div>
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

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-mint-100">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-mint-400 hover:text-mint-300 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
