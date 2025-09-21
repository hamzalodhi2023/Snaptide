import { Link } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi";

function ProfileSection({ token, profileImg }) {
  return (
    <Link
      to="/profile"
      className="hover:text-mint-300 transition-colors flex items-center"
    >
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-mint-500">
        {token && profileImg ? (
          <img
            src={`${
              import.meta.env.VITE_SNAPTIDE_URL
            }/avatar-proxy?url=${encodeURIComponent(profileImg)}`}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextElementSibling.style.display = "flex";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-mint-600">
            <HiOutlineUsers className="text-white text-xl" />
          </div>
        )}

        {!token && (
          <div className="w-full h-full flex items-center justify-center bg-mint-600">
            <HiOutlineUsers className="text-white text-xl" />
          </div>
        )}
      </div>
    </Link>
  );
}

export default ProfileSection;
