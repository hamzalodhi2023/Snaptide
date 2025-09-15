import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FeaturesDropdown from "./FeaturesDropdown";

function DesktopNav({ isActiveLink, location }) {
  const featuresDropdownRef = useRef(null);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);

  const toggleFeaturesDropdown = () =>
    setFeaturesDropdownOpen(!featuresDropdownOpen);

  return (
    <div className="hidden md:flex items-center space-x-8 relative">
      <Link
        to="/"
        className={`text-sm font-medium transition-colors relative ${
          isActiveLink("/")
            ? "text-mint-300 border-b-2 border-mint-300"
            : "hover:text-mint-300"
        }`}
      >
        Home
      </Link>

      {/* Features with Dropdown */}
      <div className="relative" ref={featuresDropdownRef}>
        <button
          onClick={toggleFeaturesDropdown}
          className={`features-dropdown-trigger text-sm font-medium transition-colors flex items-center gap-1 relative ${
            featuresDropdownOpen || location.pathname.includes("/feature")
              ? "text-mint-300 border-b-2 border-mint-300"
              : "hover:text-mint-300"
          }`}
        >
          Tools
          <svg
            className={`w-4 h-4 transition-transform ${
              featuresDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {featuresDropdownOpen && (
          <FeaturesDropdown setFeaturesDropdownOpen={setFeaturesDropdownOpen} />
        )}
      </div>

      <Link
        to="/about"
        className={`text-sm font-medium transition-colors relative ${
          isActiveLink("/about")
            ? "text-mint-300 border-b-2 border-mint-300"
            : "hover:text-mint-300"
        }`}
      >
        About
      </Link>

      <Link
        to="/contact"
        className={`text-sm font-medium transition-colors relative ${
          isActiveLink("/contact")
            ? "text-mint-300 border-b-2 border-mint-300"
            : "hover:text-mint-300"
        }`}
      >
        Contact
      </Link>
    </div>
  );
}

export default DesktopNav;
