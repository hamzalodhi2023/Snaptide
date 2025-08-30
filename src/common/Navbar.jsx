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
import { Link } from "react-router-dom";

function Navbar() {
  const navDrawerRef = useRef(null);
  const featuresDropdownRef = useRef(null);
  const mobileFeaturesRef = useRef(null); // New ref for mobile features dropdown
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false); // Separate state for mobile

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleFeaturesDropdown = () =>
    setFeaturesDropdownOpen(!featuresDropdownOpen);
  const toggleMobileFeatures = () => setMobileFeaturesOpen(!mobileFeaturesOpen); // Separate toggle for mobile

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close desktop features dropdown if clicked outside
      if (
        featuresDropdownRef.current &&
        !featuresDropdownRef.current.contains(event.target) &&
        !event.target.closest(".features-dropdown-trigger")
      ) {
        setFeaturesDropdownOpen(false);
      }

      // Close mobile features dropdown if clicked outside
      if (
        mobileFeaturesRef.current &&
        !mobileFeaturesRef.current.contains(event.target) &&
        !event.target.closest(".mobile-features-trigger")
      ) {
        setMobileFeaturesOpen(false);
      }

      // Close mobile nav drawer if clicked outside
      if (
        navDrawerRef.current &&
        !navDrawerRef.current.contains(event.target) &&
        !event.target.closest(".mobile-toggle-button")
      ) {
        setNavDrawerOpen(false);
        setMobileFeaturesOpen(false); // Also close mobile features when drawer closes
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navDrawerOpen, featuresDropdownOpen, mobileFeaturesOpen]);

  return (
    <>
      <nav className="bg-secondary text-white border-t-2">
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
              className="text-sm font-medium  hover:text-blue-600 transition-colors"
            >
              Home
            </Link>

            {/* Features with Dropdown */}
            <div className="relative" ref={featuresDropdownRef}>
              <button
                onClick={toggleFeaturesDropdown}
                className="features-dropdown-trigger text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-1"
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
                <div className="absolute top-full -left-52 mt-2 w-[90vw] max-w-[700px] bg-secondary shadow-xl border-2 border-accent rounded-lg py-4 z-50 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                  <Link
                    to="/ai-transcription"
                    className="flex items-start p-3 rounded-lg hover:bg-accent transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-blue-100 p-2 rounded-md mr-3 group-hover:bg-blue-200 transition-colors">
                      <HiOutlineMicrophone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        AI-Transcription
                      </div>
                      <div className="text-sm text-white">
                        Convert audio to text
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/video-downloader"
                    className="flex items-start p-3 rounded-lg hover:bg-accent transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-green-100 p-2 rounded-md mr-3 group-hover:bg-green-200 transition-colors">
                      <HiOutlineDownload className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        Video Downloader
                      </div>
                      <div className="text-sm text-white">
                        Download videos easily
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/video-to-text"
                    className="flex items-start p-3 rounded-lg hover:bg-accent transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-purple-100 p-2 rounded-md mr-3 group-hover:bg-purple-200 transition-colors">
                      <HiOutlineVideoCamera className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        Video to Text
                      </div>
                      <div className="text-sm text-white">
                        Extract text from videos
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/youtube-downloader"
                    className="flex items-start p-3 rounded-lg hover:bg-accent transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-red-100 p-2 rounded-md mr-3 group-hover:bg-red-200 transition-colors">
                      <IoLogoYoutube className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        YouTube Video Downloader
                      </div>
                      <div className="text-sm text-white">
                        Download YouTube videos
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/audio-to-text"
                    className="flex items-start p-3 rounded-lg hover:bg-accent transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-yellow-100 p-2 rounded-md mr-3 group-hover:bg-yellow-200 transition-colors">
                      <HiOutlineMicrophone className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        Audio to Text
                      </div>
                      <div className="text-sm text-white">
                        Transcribe audio files
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/transcribe-translation"
                    className="flex items-start p-3 rounded-lg hover:bg-accent transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-indigo-100 p-2 rounded-md mr-3 group-hover:bg-indigo-200 transition-colors">
                      <HiOutlineTranslate className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        Transcribe & Translation
                      </div>
                      <div className="text-sm text-white">
                        Transcribe and translate content
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/youtube-transcript"
                    className="flex items-start p-3 rounded-lg hover:bg-accent transition-colors group"
                    onClick={() => setFeaturesDropdownOpen(false)}
                  >
                    <div className="bg-pink-100 p-2 rounded-md mr-3 group-hover:bg-pink-200 transition-colors">
                      <HiOutlineDocumentText className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        YouTube Transcript Generator
                      </div>
                      <div className="text-sm text-white">
                        Generate YouTube transcripts
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/pricing"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              About
            </Link>

            <Link
              to="/affiliate"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right - Icons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="hover:text-blue-600 transition-colors"
            >
              <HiOutlineUsers className="h-6 w-6" />
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
        className={`fixed top-0 left-0 z-50 h-full w-80 transform bg-white shadow-xl transition-transform duration-300 md:hidden ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img
            src="/logo-light.png"
            alt="Shoppy Logo"
            className="w-28 object-contain"
          />
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 cursor-pointer text-gray-600" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          <nav className="space-y-2">
            <Link
              to="/"
              className="block py-3 px-4 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
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
                className="mobile-features-trigger flex justify-between w-full py-3 px-4 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors items-center"
              >
                <span>Features</span>
                <span>
                  {mobileFeaturesOpen ? <GrFormSubtract /> : <IoMdAdd />}
                </span>
              </button>
              {mobileFeaturesOpen && (
                <div className="pl-6 mt-2 space-y-2 border-l border-gray-200 ml-4">
                  <Link
                    to="/ai-transcription"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
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
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
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
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
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
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
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
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
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
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
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
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
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
              to="/pricing"
              className="block py-3 px-4 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => {
                setNavDrawerOpen(false);
                setMobileFeaturesOpen(false);
              }}
            >
              About
            </Link>

            <Link
              to="/affiliate"
              className="block py-3 px-4 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
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
