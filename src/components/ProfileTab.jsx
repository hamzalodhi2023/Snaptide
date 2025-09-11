import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import ProfilePictureUpload from "./ProfilePictureUpload";

function ProfileTab({ data, profileData, setProfileData }) {
  const dispatch = useDispatch();

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(profileData))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Profile updated successfully!");
        } else {
          toast.error("Failed to update profile.");
        }
      })
      .catch(() => {
        toast.error("An error occurred while updating.");
      });
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="bg-mint-900 rounded-lg p-6">
        <h2 className="text-xl font-nunito font-semibold text-mint-100 mb-4 text-center">
          Profile Picture
        </h2>
        <ProfilePictureUpload
          profileData={profileData}
          currentImage={data.user?.avatar}
        />
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
              <label className="block text-mint-100 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleProfileChange}
                className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
              />
            </div>
            <div>
              <label className="block text-mint-100 mb-2">Last Name</label>
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
              value={data.user.email}
              className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
              disabled
            />
            {data.user?.provider !== "local" && (
              <p className="text-mint-400 text-sm mt-1">
                Email cannot be changed for {data.user?.provider} accounts
              </p>
            )}
          </div>

          <div>
            <label className="block text-mint-100 mb-2">Phone Number</label>
            <input
              type="tel"
              maxLength={15}
              name="phone"
              pattern="^[0-9]{10,15}$"
              title="Phone number must be between 10 and 15 digits"
              value={profileData.phone}
              onChange={handleProfileChange}
              className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
              placeholder="Enter your phone number"
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
                placeholder="Enter your city"
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
                placeholder="Enter your state"
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
                placeholder="Enter your country"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-mint-600 hover:bg-mint-500 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileTab;
