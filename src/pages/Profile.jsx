import { useState } from "react";

function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "Hanna",
    lastName: "Khan Lodhi",
    email: "hanna.khan@example.com",
    phone: "",
    city: "",
    state: "",
    country: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log("Profile updated:", profileData);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log("Password changed:", passwordData);
  };

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Account deletion confirmed");
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    if (window.confirm("Are you sure you want to logout?")) {
      console.log("User logged out");
    }
  };

  return (
    <div className="min-h-screen bg-mint-950 text-white font-inter p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
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

        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* Profile Picture Section */}
            <div className="bg-mint-900 rounded-lg p-6">
              <h2 className="text-xl font-nunito font-semibold text-mint-100 mb-4 text-center">
                Profile Picture
              </h2>

              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-mint-800 flex items-center justify-center overflow-hidden">
                  <span className="text-2xl font-bold text-mint-300">
                    {profileData.firstName[0]}
                    {profileData.lastName[0]}
                  </span>
                </div>
                <button className="bg-mint-600 hover:bg-mint-500 text-white py-2 px-4 rounded-md text-sm transition-colors">
                  Change Picture
                </button>
              </div>
            </div>

            {/* Profile Details Form */}
            <form
              onSubmit={handleProfileSubmit}
              className="bg-mint-900 rounded-lg p-6"
            >
              <h2 className="text-xl font-nunito font-semibold text-mint-100 mb-4">
                Profile Details
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-mint-100 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                  <div>
                    <label className="block text-mint-100 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-mint-100 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
                  />
                </div>

                <div>
                  <label className="block text-mint-100 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-mint-100 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={profileData.city}
                      onChange={handleProfileChange}
                      className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                  <div>
                    <label className="block text-mint-100 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={profileData.state}
                      onChange={handleProfileChange}
                      className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                  <div>
                    <label className="block text-mint-100 mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={profileData.country}
                      onChange={handleProfileChange}
                      className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-mint-600 hover:bg-mint-500 text-white font-medium py-2 px-6 rounded-md transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Account Tab Content */}
        {activeTab === "account" && (
          <div className="space-y-6">
            {/* Change Password Form */}
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
                  <label className="block text-mint-100 mb-2">
                    New Password
                  </label>
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
        )}
      </div>
    </div>
  );
}

export default Profile;
