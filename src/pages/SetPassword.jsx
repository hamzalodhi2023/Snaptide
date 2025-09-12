import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";

function SetPassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password validation and submission logic here
    if (formData.newPassword === formData.confirmPassword) {
      console.log("Password set successfully:", formData.newPassword);
      setIsSubmitted(true);
      // You would typically call an API here to update the password
    } else {
      alert("Passwords do not match!");
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-mint-900 to-mint-950">
        <div className="bg-mint-800 p-8 rounded-2xl shadow-2xl border border-mint-600 max-w-md w-full ">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-500/20 p-4 rounded-full">
                <FaCheckCircle className="w-12 h-12 text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-nunito font-bold text-mint-100 mb-4">
              Password Set Successfully!
            </h2>
            <p className="text-mint-300 mb-6">
              Your password has been updated. You can now use your new password
              to sign in to your account.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-mint-600 hover:bg-mint-500 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full"
            >
              Back to Settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-mint-900 to-mint-950">
      <div className="bg-mint-800 p-8 rounded-2xl shadow-2xl border border-mint-600 max-w-md w-full ">
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
            <p className="text-sm text-mint-400 mt-2">
              Must be at least 8 characters long
            </p>
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
                className="w-full bg-mint-700 border border-mint-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400 pr-12"
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
          </div>

          <div className="bg-mint-700/50 p-4 rounded-lg">
            <h3 className="text-mint-200 font-medium mb-2">
              Password Requirements
            </h3>
            <ul className="text-sm text-mint-400 space-y-1">
              <li
                className={
                  formData.newPassword.length >= 8 ? "text-green-400" : ""
                }
              >
                • At least 8 characters long
              </li>
              <li
                className={
                  /[A-Z]/.test(formData.newPassword) ? "text-green-400" : ""
                }
              >
                • One uppercase letter
              </li>
              <li
                className={
                  /[0-9]/.test(formData.newPassword) ? "text-green-400" : ""
                }
              >
                • One number
              </li>
              <li
                className={
                  /[^A-Za-z0-9]/.test(formData.newPassword)
                    ? "text-green-400"
                    : ""
                }
              >
                • One special character
              </li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-mint-600 hover:bg-mint-500 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
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
