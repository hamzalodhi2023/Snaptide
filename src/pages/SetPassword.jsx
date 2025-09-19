import { useEffect, useState } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../redux/slices/authSlice";

function SetPassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  useEffect(() => {
    if (!token || !id) {
      navigate("*");
    }
  }, [navigate, token, id, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Password strength checker (same as register page)
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, message: "" };

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;

    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 1;

    // Lowercase check
    if (/[a-z]/.test(password)) strength += 1;

    // Number check
    if (/[0-9]/.test(password)) strength += 1;

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    let strengthMessage = "";
    if (strength <= 2) strengthMessage = "Weak";
    else if (strength <= 4) strengthMessage = "Medium";
    else strengthMessage = "Strong";

    return { strength, message: strengthMessage };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordStrength.strength < 3) {
      toast.error("Password is too weak.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!token || !id) {
      toast.error("Invalid or missing token.");
      return;
    }

    try {
      const res = await dispatch(
        resetPassword({
          token,
          password: formData.newPassword,
          id, // only if your backend needs it
        })
      ).unwrap();

      toast.success(res.message || "Password has been reset!");
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err || "Something went wrong. Try again.");
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Password requirement check icons (same as register page)
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-mint-900 to-mint-950">
        <div className="bg-mint-800 p-8 rounded-2xl shadow-2xl border border-mint-600 max-w-md w-full">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-500/20 p-4 rounded-full">
                <FaCheck className="w-12 h-12 text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-nunito font-bold text-mint-100 mb-4">
              Password Set Successfully!
            </h2>
            <p className="text-mint-300 mb-6">
              Your password has been updated. You can now use your new password
              to sign in to your account.
            </p>
            <Link
              to="/profile"
              className="bg-mint-600 hover:bg-mint-500 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full inline-block"
            >
              Back to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-mint-900 to-mint-950">
      <div className="bg-mint-800 p-8 rounded-2xl shadow-2xl border border-mint-600 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-mint-700 p-4 rounded-full">
              <FaLock className="w-8 h-8 text-mint-300" />
            </div>
          </div>
          <h1 className="text-3xl font-nunito font-bold text-mint-100 mb-2">
            Set New Password
          </h1>
          <p className="text-mint-300">
            Create a strong password to secure your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-mint-100 mb-2 font-medium"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full bg-mint-700 border border-mint-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400 pr-12"
                placeholder="Enter your new password"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mint-400 hover:text-mint-300"
              >
                {showNewPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator (same as register page) */}
            {formData.newPassword && (
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

                {/* Password Requirements (same as register page) */}
                <div className="grid grid-cols-2 gap-2">
                  <RequirementCheck
                    met={formData.newPassword.length >= 8}
                    text="8+ characters"
                  />
                  <RequirementCheck
                    met={/[A-Z]/.test(formData.newPassword)}
                    text="Uppercase letter"
                  />
                  <RequirementCheck
                    met={/[a-z]/.test(formData.newPassword)}
                    text="Lowercase letter"
                  />
                  <RequirementCheck
                    met={/[0-9]/.test(formData.newPassword)}
                    text="Number"
                  />
                  <RequirementCheck
                    met={/[^A-Za-z0-9]/.test(formData.newPassword)}
                    text="Special character"
                  />
                </div>
              </div>
            )}
          </div>

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
                className={`w-full bg-mint-700 border rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400 pr-12 ${
                  formData.confirmPassword &&
                  formData.newPassword !== formData.confirmPassword
                    ? "border-red-500"
                    : formData.confirmPassword &&
                      formData.newPassword === formData.confirmPassword
                    ? "border-green-500"
                    : "border-mint-600"
                }`}
                placeholder="Confirm your new password"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mint-400 hover:text-mint-300"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {formData.confirmPassword &&
              formData.newPassword !== formData.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">
                  Passwords do not match
                </p>
              )}
            {formData.confirmPassword &&
              formData.newPassword === formData.confirmPassword && (
                <p className="text-green-400 text-xs mt-1">Passwords match</p>
              )}
          </div>

          <button
            type="submit"
            disabled={passwordStrength.strength < 3}
            className={`w-full bg-mint-600 hover:bg-mint-500 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              passwordStrength.strength < 3
                ? "opacity-75 cursor-not-allowed"
                : ""
            }`}
          >
            <FaLock className="w-5 h-5" />
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetPassword;
