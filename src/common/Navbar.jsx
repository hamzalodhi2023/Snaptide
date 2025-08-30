import { useState, useEffect, useRef } from "react";
import {
  HiOutlineUsers,
  HiOutlineDownload,
  HiOutlineMicrophone,
  HiOutlineVideoCamera,
  HiOutlineTranslate,
  HiOutlineDocumentText,
} from "react-icons/hi"; // all v1 icons
import { HiBars3BottomRight } from "react-icons/hi2"; // only this one is from v2
import { IoMdClose, IoLogoYoutube } from "react-icons/io"; // single import, no duplicates
import { Link } from "react-router-dom";

function Navbar() {
  const navDrawerRef = useRef(null);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleFeaturesDropdown = () =>
    setFeaturesDropdownOpen(!featuresDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navDrawerRef.current &&
        !navDrawerRef.current.contains(event.target)
      ) {
        setNavDrawerOpen(false);
        setFeaturesDropdownOpen(false);
      }
    };

    if (navDrawerOpen || featuresDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navDrawerOpen, featuresDropdownOpen]);

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
            <div className="relative">
              <button
                onMouseEnter={() => setFeaturesDropdownOpen(true)}
                onMouseLeave={() => setFeaturesDropdownOpen(false)}
                className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-1"
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
                <div
                  onMouseEnter={() => setFeaturesDropdownOpen(true)}
                  onMouseLeave={() => setFeaturesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-[90vw] max-w-[700px] bg-white shadow-xl border rounded-lg py-4 z-50 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4"
                >
                  <Link
                    to="/ai-transcription"
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="bg-blue-100 p-2 rounded-md mr-3 group-hover:bg-blue-200 transition-colors">
                      <HiOutlineMicrophone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        AI-Transcription
                      </div>
                      <div className="text-sm text-gray-500">
                        Convert audio to text
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/video-downloader"
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="bg-green-100 p-2 rounded-md mr-3 group-hover:bg-green-200 transition-colors">
                      <HiOutlineDownload className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Video Downloader
                      </div>
                      <div className="text-sm text-gray-500">
                        Download videos easily
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/video-to-text"
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="bg-purple-100 p-2 rounded-md mr-3 group-hover:bg-purple-200 transition-colors">
                      <HiOutlineVideoCamera className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Video to Text
                      </div>
                      <div className="text-sm text-gray-500">
                        Extract text from videos
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/youtube-downloader"
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="bg-red-100 p-2 rounded-md mr-3 group-hover:bg-red-200 transition-colors">
                      <IoLogoYoutube className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        YouTube Video Downloader
                      </div>
                      <div className="text-sm text-gray-500">
                        Download YouTube videos
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/audio-to-text"
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="bg-yellow-100 p-2 rounded-md mr-3 group-hover:bg-yellow-200 transition-colors">
                      <HiOutlineMicrophone className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Audio to Text
                      </div>
                      <div className="text-sm text-gray-500">
                        Transcribe audio files
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/transcribe-translation"
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="bg-indigo-100 p-2 rounded-md mr-3 group-hover:bg-indigo-200 transition-colors">
                      <HiOutlineTranslate className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Transcribe & Translation
                      </div>
                      <div className="text-sm text-gray-500">
                        Transcribe and translate content
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/youtube-transcript"
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="bg-pink-100 p-2 rounded-md mr-3 group-hover:bg-pink-200 transition-colors">
                      <HiOutlineDocumentText className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        YouTube Transcript Generator
                      </div>
                      <div className="text-sm text-gray-500">
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
              Pricing
            </Link>

            <Link
              to="/affiliate"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Join Affiliate
            </Link>

            <Link
              to="/blogs"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Blogs
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
            <button onClick={toggleNavDrawer} className="md:hidden">
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
              className="block py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={toggleNavDrawer}
            >
              Home
            </Link>

            {/* Features Dropdown for Mobile */}
            <div>
              <button
                onClick={toggleFeaturesDropdown}
                className="flex justify-between w-full py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <span>Features</span>
                <span>{featuresDropdownOpen ? "-" : "+"}</span>
              </button>
              {featuresDropdownOpen && (
                <div className="pl-6 mt-2 space-y-2 border-l border-gray-200 ml-4">
                  <Link
                    to="/ai-transcription"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={toggleNavDrawer}
                  >
                    <HiOutlineMicrophone className="w-4 h-4 mr-2" />
                    AI-Transcription
                  </Link>
                  <Link
                    to="/video-downloader"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={toggleNavDrawer}
                  >
                    <HiOutlineDownload className="w-4 h-4 mr-2" />
                    Video Downloader
                  </Link>
                  <Link
                    to="/video-to-text"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={toggleNavDrawer}
                  >
                    <HiOutlineVideoCamera className="w-4 h-4 mr-2" />
                    Video to Text
                  </Link>
                  <Link
                    to="/youtube-downloader"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={toggleNavDrawer}
                  >
                    <IoLogoYoutube className="w-4 h-4 mr-2" />
                    YouTube Video Downloader
                  </Link>
                  <Link
                    to="/audio-to-text"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={toggleNavDrawer}
                  >
                    <HiOutlineMicrophone className="w-4 h-4 mr-2" />
                    Audio to Text
                  </Link>
                  <Link
                    to="/transcribe-translation"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={toggleNavDrawer}
                  >
                    <HiOutlineTranslate className="w-4 h-4 mr-2" />
                    Transcribe & Translation
                  </Link>
                  <Link
                    to="/youtube-transcript"
                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={toggleNavDrawer}
                  >
                    <HiOutlineDocumentText className="w-4 h-4 mr-2" />
                    YouTube Transcript Generator
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/pricing"
              className="block py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={toggleNavDrawer}
            >
              Pricing
            </Link>

            <Link
              to="/affiliate"
              className="block py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={toggleNavDrawer}
            >
              Join Affiliate
            </Link>

            <Link
              to="/blogs"
              className="block py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={toggleNavDrawer}
            >
              Blogs
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
