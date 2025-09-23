import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, getProfile } from "../redux/slices/profileSlice";
import { toast } from "react-toastify";
import {
  FaChevronDown,
  FaEnvelope,
  FaExclamationTriangle,
  FaGoogle,
  FaKey,
  FaLink,
  FaLock,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function AccountTab({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteReasons = [
    "I found a better alternative",
    "Privacy concerns",
    "Too many emails/notifications",
    "I don't use this account anymore",
    "Security concerns",
    "I'm creating a new account",
    "Other",
  ];

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteAccount = async () => {
    if (!deleteReason) {
      toast.error("Please select a reason for deleting your account");
      return;
    }

    if (deleteReason === "Other" && !otherReason.trim()) {
      toast.error("Please specify your reason");
      return;
    }

    setIsDeleting(true);

    try {
      const reason = deleteReason === "Other" ? otherReason : deleteReason;
      const res = await dispatch(deleteUser({ reason })).unwrap();

      toast.success("Account deleted successfully!");
      dispatch(getProfile());
      navigate("/login");
    } catch (error) {
      console.error("Account deletion failed:", error);
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Social Account Info */}
      {data && (
        <div className="bg-mint-900 rounded-lg p-6 border border-mint-800">
          <h2 className="text-xl font-nunito font-semibold text-mint-100 mb-6 flex items-center gap-2">
            <FaKey className="text-mint-300" />
            Account Information
          </h2>

          <div className="space-y-4">
            {/* Login Method */}
            <div className="flex items-center gap-3">
              <div className="bg-mint-800 p-2 rounded-lg">
                {data?.provider === "google" && (
                  <FaGoogle className="w-5 h-5 text-mint-300" />
                )}
                {data?.provider === "local" && (
                  <FaLink className="w-5 h-5 text-mint-300" />
                )}
              </div>
              <div>
                <p className="text-mint-400 text-sm">Logged in via</p>
                <p className="text-mint-100 font-medium capitalize">
                  {data?.provider === "local"
                    ? "Email & Password"
                    : data?.provider}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="bg-mint-800 p-2 rounded-lg">
                <FaEnvelope className="w-5 h-5 text-mint-300" />
              </div>
              <div>
                <p className="text-mint-400 text-sm">Email address</p>
                <p className="text-mint-100 font-medium">{data?.email}</p>
              </div>
            </div>

            {/* Password Status */}
            <div className="flex items-center gap-3">
              <div className="bg-mint-800 p-2 rounded-lg">
                <FaLock className="w-5 h-5 text-mint-300" />
              </div>
              <div>
                <p className="text-mint-400 text-sm">Password status</p>
                {data?.hasPassword === false ? (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-sm">Not set</span>
                    <Link
                      to="/update-password"
                      className="text-mint-300 hover:text-mint-100 text-sm font-medium underline flex items-center gap-1 transition-colors"
                    >
                      Set Password
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-sm">Active</span>
                    <Link
                      to="/update-password"
                      className="text-mint-300 hover:text-mint-100 text-sm font-medium underline flex items-center gap-1 transition-colors"
                    >
                      Update Password
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-mint-800/50 rounded-lg border border-mint-700">
            <p className="text-mint-300 text-sm">
              {data?.hasPassword === false ? (
                <>Set a password to enable email login for your account.</>
              ) : (
                <>You can update your password anytime for added security.</>
              )}
            </p>
          </div>
        </div>
      )}
      {/* Delete Account Section */}
      <div className="bg-mint-900 rounded-lg p-6 border border-red-500/30">
        <h2 className="text-xl font-nunito font-semibold text-red-400 mb-2">
          Delete Account
        </h2>
        <p className="text-mint-200 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center gap-2"
        >
          <FaExclamationTriangle className="w-4 h-4" />
          Delete Account
        </button>
      </div>
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-mint-900 rounded-xl p-6 w-full max-w-md border border-red-500/50">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-red-500/20 p-4 rounded-full">
                  <FaExclamationTriangle className="w-8 h-8 text-red-400" />
                </div>
              </div>
              <h3 className="text-2xl font-nunito font-bold text-red-400 mb-2">
                Delete Your Account?
              </h3>
              <p className="text-mint-300">
                This action cannot be undone. All your data will be permanently
                deleted.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-mint-100 mb-2 font-medium">
                  Why are you deleting your account?
                </label>
                <div className="relative">
                  <select
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                    className="w-full bg-mint-800 border border-mint-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none"
                  >
                    <option value="">Select a reason</option>
                    {deleteReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mint-400 pointer-events-none" />
                </div>
              </div>

              {deleteReason === "Other" && (
                <div>
                  <label className="block text-mint-100 mb-2 font-medium">
                    Please specify your reason
                  </label>
                  <textarea
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    className="w-full bg-mint-800 border border-mint-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                    rows="3"
                    placeholder="Tell us why you're leaving..."
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteReason("");
                  setOtherReason("");
                }}
                className="flex-1 bg-mint-700 hover:bg-mint-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={
                  isDeleting ||
                  !deleteReason ||
                  (deleteReason === "Other" && !otherReason.trim())
                }
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  "Delete Account"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountTab;
