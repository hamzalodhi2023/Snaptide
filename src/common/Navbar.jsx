import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import DesktopNav from "./Navbar/DesktopNav";
import MobileNav from "./Navbar/MobileNav";
import ProfileSection from "./Navbar/ProfileSection";
import { HiBars3BottomRight } from "react-icons/hi2";

function Navbar() {
  const navDrawerRef = useRef(null);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    if (user?.avatar?.url) {
      setProfileImg(user.avatar.url);
    }
  }, [user?.avatar?.url]);

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navDrawerRef.current &&
        !navDrawerRef.current.contains(event.target) &&
        !event.target.closest(".mobile-toggle-button")
      ) {
        setNavDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navDrawerOpen]);

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-mint-700 text-white">
        <div className="container mx-auto flex justify-between px-6 py-4 items-center">
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src="/logo-dark.png"
                alt="Shoppy Logo"
                className="w-24 md:w-28 lg:w-32 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <DesktopNav isActiveLink={isActiveLink} location={location} />

          {/* Profile Section and Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <ProfileSection token={token} profileImg={profileImg} />
            <button
              onClick={toggleNavDrawer}
              className="md:hidden mobile-toggle-button"
            >
              <HiBars3BottomRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav
        navDrawerRef={navDrawerRef}
        navDrawerOpen={navDrawerOpen}
        toggleNavDrawer={toggleNavDrawer}
        isActiveLink={isActiveLink}
        location={location}
      />
    </>
  );
}

export default Navbar;
