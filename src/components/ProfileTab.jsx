import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import ProfilePictureUpload from "./ProfilePictureUpload";

function ProfileTab({ data, profileData, setProfileData }) {
  const dispatch = useDispatch();
  const isGoogleUser = data.user?.provider === "google";
  const [showUploadModal, setShowUploadModal] = useState(false);

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

  // Function to handle dummy image click
  const handleDummyImageClick = () => {
    setShowUploadModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="bg-mint-900 rounded-lg p-6">
        <h2 className="text-xl font-nunito font-semibold text-mint-100 mb-4 text-center">
          Profile Picture
        </h2>

        {isGoogleUser ? (
          // Google User - Display only, no editing
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-mint-800 flex items-center justify-center overflow-hidden border-2 border-mint-600">
                {data.user?.avatar ? (
                  <img
                    src={data.user.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-mint-300">
                    {profileData.firstName?.[0]}
                    {profileData.lastName?.[0]}
                  </span>
                )}
              </div>
            </div>

            <p className="text-mint-300 mt-4 text-center">
              Your profile picture is managed by Google and cannot be changed
              here.
            </p>
          </div>
        ) : (
          // Local User - Show dummy image if no avatar exists
          <div className="flex flex-col items-center">
            {data.user?.avatar ? (
              // If user has an avatar, show the ProfilePictureUpload component
              <ProfilePictureUpload
                profileData={profileData}
                currentImage={data.user.avatar}
              />
            ) : (
              // If no avatar, show dummy image that opens upload modal when clicked
              <>
                <div
                  className="relative cursor-pointer"
                  onClick={handleDummyImageClick}
                >
                  <div className="w-32 h-32 rounded-full bg-mint-800 flex items-center justify-center overflow-hidden border-2 border-mint-600 border-dashed">
                    {/* Dummy user icon */}
                    <svg
                      className="w-16 h-16 text-mint-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Camera icon overlay */}
                  <div className="absolute bottom-0 right-0 bg-mint-600 text-white p-2 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>

                <p className="text-mint-300 mt-4 text-center">
                  Click on the image to upload a profile picture
                </p>

                {/* Upload Modal */}
                {showUploadModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-mint-900 rounded-lg p-6 w-full max-w-md mx-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-mint-100">
                          Upload Profile Picture
                        </h3>
                        <button
                          onClick={() => setShowUploadModal(false)}
                          className="text-mint-300 hover:text-white"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <ProfilePictureUpload
                        profileData={profileData}
                        currentImage={null}
                        onUploadComplete={() => setShowUploadModal(false)}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
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
                value={profileData.firstName || ""}
                onChange={handleProfileChange}
                className="w-full bg-mint-800 border border-mint-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-mint-400"
              />
            </div>
            <div>
              <label className="block text-mint-100 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName || ""}
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
              value={data.user.email || ""}
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
              value={profileData.phone || ""}
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
                value={profileData.city || ""}
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
                value={profileData.state || ""}
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
                value={profileData.country || ""}
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
