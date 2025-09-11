import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

function Account({ data }) {
  const dispatch = useDispatch();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //`   Delete Account
  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      dispatch(deleteUser()).then(() => {
        toast.success("Account deleted successfully!");
      });
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log("Password changed:", passwordData);
  };
  return (
    <div className="space-y-6">
      {/* Change Password Form - Only show for local accounts */}
      {data.user?.provider === "local" && (
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-mint-900 rounded-lg p-6"
        >
          <h2 className="text-xl font-nunito font-semibold text-mint-100 mb-4">
            Change Password
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-mint-100 mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
              />
            </div>

            <div>
              <label className="block text-mint-100 mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
              />
            </div>

            <div>
              <label className="block text-mint-100 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-mint-600 hover:bg-mint-500 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      )}

      {/* Social Account Info */}
      {data.user?.provider !== "local" && (
        <div className="bg-mint-900 rounded-lg p-6 border border-mint-800">
          <h2 className="text-xl font-nunito font-semibold text-mint-100 mb-4">
            Account Information
          </h2>
          <p className="text-mint-200 mb-2">
            <span className="font-semibold">Logged in via:</span>{" "}
            {data.user?.provider}
          </p>
          <p className="text-mint-200">
            <span className="font-semibold">Email:</span> {data.user?.email}
          </p>
          <p className="text-mint-400 text-sm mt-3">
            Your account is managed through {data.user?.provider}. Password
            changes must be made through their platform.
          </p>
        </div>
      )}

      {/* Delete Account Section */}
      <div className="bg-mint-900 rounded-lg p-6 border border-mint-800">
        <h2 className="text-xl font-nunito font-semibold text-mint-100 mb-2">
          Delete Account
        </h2>
        <p className="text-mint-200 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>

        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Account;
