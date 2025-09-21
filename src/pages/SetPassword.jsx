import { useEffect, useState } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword, validateResetToken } from "../redux/slices/authSlice";
import { PulseLoader } from "react-spinners";

function SetPassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const { isResetTokenValid, validateLoading, resetLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token && id) {
      dispatch(validateResetToken({ token, id }));
    }
  }, [dispatch, token, id]);

  useEffect(() => {
    if (!token || !id) {
      navigate("*");
    }
  }, [navigate, token, id]);

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
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
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

    try {
      const res = await dispatch(
        resetPassword({
          token,
          password: formData.newPassword,
          id,
        })
      ).unwrap();

      toast.success(res.message || "Password has been reset!");
      setShowSuccessDialog(true);
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

  // Token expired/invalid view
  if (!validateLoading && !isResetTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-mint-900 to-mint-950">
        <div className="bg-mint-800 p-8 rounded-2xl shadow-2xl border border-red-500/30 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-500/20 p-4 rounded-full">
              <FaExclamationTriangle className="w-12 h-12 text-red-400" />
            </div>
          </div>
          <h1 className="text-2xl font-nunito font-bold text-red-400 mb-4">
            Link Expired
          </h1>
          <p className="text-mint-300 mb-6">
            This password reset link has expired or is invalid. Please request a
            new reset link.
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (validateLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-mint-900 to-mint-950">
        <div className="bg-mint-800 p-8 rounded-2xl shadow-2xl border border-mint-600 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <PulseLoader color="#4FD1C5" size={15} />
          </div>
          <p className="text-mint-300">Validating your reset link...</p>
        </div>
      </div>
    );
  }

  // Success dialog
  if (showSuccessDialog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-mint-900 to-mint-950">
        <div className="bg-mint-800 p-8 rounded-2xl shadow-2xl border border-green-500/30 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500/20 p-4 rounded-full">
              <FaCheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>
          <h1 className="text-2xl font-nunito font-bold text-green-400 mb-4">
            Password Reset Successful!
          </h1>
          <p className="text-mint-300 mb-6">
            Your password has been successfully reset. You can now log in with
            your new password.
          </p>
        </div>
      </div>
    );
  }

  // Main form view
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
            disabled={passwordStrength.strength < 3 || resetLoading}
            className={`w-full bg-mint-600 hover:bg-mint-500 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              passwordStrength.strength < 3 || resetLoading
                ? "opacity-75 cursor-not-allowed"
                : ""
            }`}
          >
            {resetLoading ? (
              <>
                <PulseLoader color="#ffffff" size={8} />
                <span>Setting Password...</span>
              </>
            ) : (
              <>
                <FaLock className="w-5 h-5" />
                Set Password
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetPassword;
