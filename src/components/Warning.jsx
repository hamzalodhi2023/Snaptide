import { useSelector } from "react-redux";
import { FaExclamationCircle, FaKey, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Warning() {
  const { user } = useSelector((state) => state.profile);

  // Show only if hasPassword === false
  if (user?.hasPassword !== false) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 shadow-sm">
      <div className="w-full mx-auto px-3 sm:px-4 py-3 sm:py-4 ">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          {/* Left Content - Message */}
          <div className="flex items-start sm:items-center flex-1 min-w-0">
            <div className="flex-shrink-0 mt-0.5 sm:mt-0">
              <FaExclamationCircle
                className="h-5 w-5 text-yellow-500 sm:h-6 sm:w-6"
                aria-hidden="true"
              />
            </div>

            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm sm:text-base text-yellow-800 font-medium">
                Security Reminder
              </p>

              <p className="text-xs sm:text-sm text-yellow-700 mt-1">
                <span className="block sm:inline">
                  You signed in with {user?.provider || "social"}.
                </span>
                <span className="block sm:inline">
                  {" "}
                  Set a password to enable email login.
                </span>
              </p>

              {/* Mobile-only button */}
              <div className="sm:hidden mt-2">
                <Link
                  to="/update-password"
                  className="inline-flex items-center text-xs font-medium bg-yellow-500 text-white px-3 py-1.5 rounded-lg hover:bg-yellow-600 transition-colors shadow-sm"
                >
                  <FaKey className="mr-1.5 h-3 w-3" />
                  Set Password Now
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Button (Desktop) */}
          <div className="hidden sm:flex flex-shrink-0">
            <Link
              to="/update-password"
              className="inline-flex items-center text-sm font-medium bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
            >
              <FaShieldAlt className="mr-2 h-4 w-4" />
              Set Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Warning;
