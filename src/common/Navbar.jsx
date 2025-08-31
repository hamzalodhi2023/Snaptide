import { useState, useEffect, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import {
  HiOutlineUsers,
  HiOutlineDownload,
  HiOutlineMicrophone,
  HiOutlineVideoCamera,
  HiOutlineTranslate,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose, IoLogoYoutube } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const navDrawerRef = useRef(null);
  const featuresDropdownRef = useRef(null);
  const mobileFeaturesRef = useRef(null);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const location = useLocation();

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleFeaturesDropdown = () =>
    setFeaturesDropdownOpen(!featuresDropdownOpen);
  const toggleMobileFeatures = () => setMobileFeaturesOpen(!mobileFeaturesOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        featuresDropdownRef.current &&
        !featuresDropdownRef.current.contains(event.target) &&
        !event.target.closest(".features-dropdown-trigger")
      ) {
        setFeaturesDropdownOpen(false);
      }

      if (
        mobileFeaturesRef.current &&
        !mobileFeaturesRef.current.contains(event.target) &&
        !event.target.closest(".mobile-features-trigger")
      ) {
        setMobileFeaturesOpen(false);
      }

      if (
        navDrawerRef.current &&
        !navDrawerRef.current.contains(event.target) &&
        !event.target.closest(".mobile-toggle-button")
      ) {
        setNavDrawerOpen(false);
        setMobileFeaturesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navDrawerOpen, featuresDropdownOpen, mobileFeaturesOpen]);

  // Check if a link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="bg-mint-700 text-white">
        <div className="container mx-auto flex justify-between px-6 py-4 items-center">
          {/* Left - Logo */}
          <div>
            <Link to="/">
              <img
                src="/logo-dark.png"
                alt="Shoppy Logo"
                className="w-24 md:w-28 lg:w-32 object-contain"
              />
            </Link>
          </div>

          {/* Center - Navigation Links */}
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
                Features
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
                <div className="absolute top-full -left-52 mt-2 w-[90vw] max-w-[700px] bg-mint-800 shadow-xl border-2 border-mint-600 rounded-lg py-4 z-50 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                  <Link
                    to="/ai-transcription"
                    className="flex items-start p-3 rounded-lg hover:bg-mint-700 transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-mint-600 p-2 rounded-md mr-3 group-hover:bg-mint-500 transition-colors">
                      <HiOutlineMicrophone className="w-5 h-5 text-mint-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        AI-Transcription
                      </div>
                      <div className="text-sm text-mint-200">
                        Convert audio to text
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/video-downloader"
                    className="flex items-start p-3 rounded-lg hover:bg-mint-700 transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-mint-600 p-2 rounded-md mr-3 group-hover:bg-mint-500 transition-colors">
                      <HiOutlineDownload className="w-5 h-5 text-mint-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        Video Downloader
                      </div>
                      <div className="text-sm text-mint-200">
                        Download videos easily
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/video-to-text"
                    className="flex items-start p-3 rounded-lg hover:bg-mint-700 transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-mint-600 p-2 rounded-md mr-3 group-hover:bg-mint-500 transition-colors">
                      <HiOutlineVideoCamera className="w-5 h-5 text-mint-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        Video to Text
                      </div>
                      <div className="text-sm text-mint-200">
                        Extract text from videos
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/youtube-downloader"
                    className="flex items-start p-3 rounded-lg hover:bg-mint-700 transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-mint-600 p-2 rounded-md mr-3 group-hover:bg-mint-500 transition-colors">
                      <IoLogoYoutube className="w-5 h-5 text-mint-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        YouTube Video Downloader
                      </div>
                      <div className="text-sm text-mint-200">
                        Download YouTube videos
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/audio-to-text"
                    className="flex items-start p-3 rounded-lg hover:bg-mint-700 transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-mint-600 p-2 rounded-md mr-3 group-hover:bg-mint-500 transition-colors">
                      <HiOutlineMicrophone className="w-5 h-5 text-mint-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        Audio to Text
                      </div>
                      <div className="text-sm text-mint-200">
                        Transcribe audio files
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/transcribe-translation"
                    className="flex items-start p-3 rounded-lg hover:bg-mint-700 transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-mint-600 p-2 rounded-md mr-3 group-hover:bg-mint-500 transition-colors">
                      <HiOutlineTranslate className="w-5 h-5 text-mint-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        Transcribe & Translation
                      </div>
                      <div className="text-sm text-mint-200">
                        Transcribe and translate content
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/youtube-transcript"
                    className="flex items-start p-3 rounded-lg hover:bg-mint-700 transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-mint-600 p-2 rounded-md mr-3 group-hover:bg-mint-500 transition-colors">
                      <HiOutlineDocumentText className="w-5 h-5 text-mint-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        YouTube Transcript Generator
                      </div>
                      <div className="text-sm text-mint-200">
                        Generate YouTube transcripts
                      </div>
                    </div>
                  </Link>
                </div>
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

          {/* Right - Profile Image */}
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="hover:text-mint-300 transition-colors flex items-center"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-mint-500">
                <img
                  src="https://thispersondoesnotexist.com/"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback if image fails to load */}
                <div className="w-full h-full items-center justify-center bg-mint-600 hidden">
                  <HiOutlineUsers className="text-white text-xl" />
                </div>
              </div>
            </Link>
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
      <div
        ref={navDrawerRef}
        className={`fixed top-0 left-0 z-50 h-full w-80 transform bg-mint-800 shadow-xl transition-transform duration-300 md:hidden ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-mint-700">
          <img
            src="/logo-light.png"
            alt="Shoppy Logo"
            className="w-28 object-contain"
          />
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 cursor-pointer text-mint-300" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          <nav className="space-y-2">
            <Link
              to="/"
              className={`block py-3 px-4 rounded-lg transition-colors ${
                isActiveLink("/")
                  ? "bg-mint-700 text-mint-300"
                  : "text-mint-100 hover:bg-mint-700"
              }`}
              onClick={() => {
                setNavDrawerOpen(false);
                setMobileFeaturesOpen(false);
              }}
            >
              Home
            </Link>

            {/* Features Dropdown for Mobile */}
            <div ref={mobileFeaturesRef}>
              <button
                onClick={toggleMobileFeatures}
                className={`mobile-features-trigger flex justify-between w-full py-3 px-4 rounded-lg transition-colors items-center ${
                  mobileFeaturesOpen || location.pathname.includes("/feature")
                    ? "bg-mint-700 text-mint-300"
                    : "text-mint-100 hover:bg-mint-700"
                }`}
              >
                <span>Features</span>
                <span>
                  {mobileFeaturesOpen ? <GrFormSubtract /> : <IoMdAdd />}
                </span>
              </button>
              {mobileFeaturesOpen && (
                <div className="pl-6 mt-2 space-y-2 border-l border-mint-600 ml-4">
                  <Link
                    to="/ai-transcription"
                    className={`flex items-center py-2 transition-colors ${
                      isActiveLink("/ai-transcription")
                        ? "text-mint-300"
                        : "text-mint-200 hover:text-mint-50"
                    }`}
                    onClick={() => {
                      setNavDrawerOpen(false);
                      setMobileFeaturesOpen(false);
                    }}
                  >
                    <HiOutlineMicrophone className="w-4 h-4 mr-2" />
                    AI-Transcription
                  </Link>
                  <Link
                    to="/video-downloader"
                    className={`flex items-center py-2 transition-colors ${
                      isActiveLink("/video-downloader")
                        ? "text-mint-300"
                        : "text-mint-200 hover:text-mint-50"
                    }`}
                    onClick={() => {
                      setNavDrawerOpen(false);
                      setMobileFeaturesOpen(false);
                    }}
                  >
                    <HiOutlineDownload className="w-4 h-4 mr-2" />
                    Video Downloader
                  </Link>
                  <Link
                    to="/video-to-text"
                    className={`flex items-center py-2 transition-colors ${
                      isActiveLink("/video-to-text")
                        ? "text-mint-300"
                        : "text-mint-200 hover:text-mint-50"
                    }`}
                    onClick={() => {
                      setNavDrawerOpen(false);
                      setMobileFeaturesOpen(false);
                    }}
                  >
                    <HiOutlineVideoCamera className="w-4 h-4 mr-2" />
                    Video to Text
                  </Link>
                  <Link
                    to="/youtube-downloader"
                    className={`flex items-center py-2 transition-colors ${
                      isActiveLink("/youtube-downloader")
                        ? "text-mint-300"
                        : "text-mint-200 hover:text-mint-50"
                    }`}
                    onClick={() => {
                      setNavDrawerOpen(false);
                      setMobileFeaturesOpen(false);
                    }}
                  >
                    <IoLogoYoutube className="w-4 h-4 mr-2" />
                    YouTube Video Downloader
                  </Link>
                  <Link
                    to="/audio-to-text"
                    className={`flex items-center py-2 transition-colors ${
                      isActiveLink("/audio-to-text")
                        ? "text-mint-300"
                        : "text-mint-200 hover:text-mint-50"
                    }`}
                    onClick={() => {
                      setNavDrawerOpen(false);
                      setMobileFeaturesOpen(false);
                    }}
                  >
                    <HiOutlineMicrophone className="w-4 h-4 mr-2" />
                    Audio to Text
                  </Link>
                  <Link
                    to="/transcribe-translation"
                    className={`flex items-center py-2 transition-colors ${
                      isActiveLink("/transcribe-translation")
                        ? "text-mint-300"
                        : "text-mint-200 hover:text-mint-50"
                    }`}
                    onClick={() => {
                      setNavDrawerOpen(false);
                      setMobileFeaturesOpen(false);
                    }}
                  >
                    <HiOutlineTranslate className="w-4 h-4 mr-2" />
                    Transcribe & Translation
                  </Link>
                  <Link
                    to="/youtube-transcript"
                    className={`flex items-center py-2 transition-colors ${
                      isActiveLink("/youtube-transcript")
                        ? "text-mint-300"
                        : "text-mint-200 hover:text-mint-50"
                    }`}
                    onClick={() => {
                      setNavDrawerOpen(false);
                      setMobileFeaturesOpen(false);
                    }}
                  >
                    <HiOutlineDocumentText className="w-4 h-4 mr-2" />
                    YouTube Transcript Generator
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`block py-3 px-4 rounded-lg transition-colors ${
                isActiveLink("/about")
                  ? "bg-mint-700 text-mint-300"
                  : "text-mint-100 hover:bg-mint-700"
              }`}
              onClick={() => {
                setNavDrawerOpen(false);
                setMobileFeaturesOpen(false);
              }}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`block py-3 px-4 rounded-lg transition-colors ${
                isActiveLink("/contact")
                  ? "bg-mint-700 text-mint-300"
                  : "text-mint-100 hover:bg-mint-700"
              }`}
              onClick={() => {
                setNavDrawerOpen(false);
                setMobileFeaturesOpen(false);
              }}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
