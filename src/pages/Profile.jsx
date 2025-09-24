import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";

import { logoutUser } from "../redux/slices/authSlice";
import { getProfile } from "../redux/slices/profileSlice"; // ✅ redux thunk

import ProfileTab from "../components/ProfileTab";
import AccountTab from "../components/AccountTab";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");

  const { token } = useSelector((state) => state.auth);
  const { user, loading, error } = useSelector((state) => state.profile);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
    country: "",
  });

  // 🔐 Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // 🧠 Fill local state when profile is ready
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
      });
    }
  }, [user]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logoutUser()).then(() => {
        toast.success("You have been logged out successfully!");
        dispatch(getProfile());
        navigate("/login");
      });
    }
  };

  // 🔃 Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-mint-950 text-white font-inter flex items-center justify-center">
        <div className="text-center">
          <ScaleLoader
            color="#3b94d9"
            height={35}
            width={4}
            radius={2}
            margin={2}
          />
          <p className="text-mint-200 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <div className="min-h-screen bg-mint-950 text-white font-inter flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-400"
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
          <p className="text-mint-200 mb-4">Failed to load profile data.</p>
          <button
            onClick={() => dispatch(getProfile())}
            className="bg-mint-600 hover:bg-mint-500 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-mint-950 text-white font-inter p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold font-nunito text-mint-200 mb-2">
              Profile Settings
            </h1>
            <p className="text-mint-100">
              Manage your profile and account settings
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-mint-700 hover:bg-mint-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-mint-800 mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "profile"
                ? "border-b-2 border-mint-200 text-mint-200"
                : "text-mint-400 hover:text-mint-200"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "account"
                ? "border-b-2 border-mint-200 text-mint-200"
                : "text-mint-400 hover:text-mint-200"
            }`}
            onClick={() => setActiveTab("account")}
          >
            Account
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <ProfileTab
            data={user} // ✅ FIXED HERE
            profileData={profileData}
            setProfileData={setProfileData}
          />
        )}
        {activeTab === "account" && <AccountTab data={user} />}
      </div>
    </div>
  );
}

export default Profile;
