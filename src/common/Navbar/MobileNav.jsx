import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import {
  HiOutlineMicrophone,
  HiOutlineDownload,
  HiOutlineVideoCamera,
  HiOutlineTranslate,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { IoLogoYoutube } from "react-icons/io";

function MobileNav({
  navDrawerRef,
  navDrawerOpen,
  toggleNavDrawer,
  isActiveLink,
  location,
}) {
  const mobileFeaturesRef = useRef(null);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);

  const toggleMobileFeatures = () => setMobileFeaturesOpen(!mobileFeaturesOpen);

  // Tools data array
  const tools = [
    {
      path: "/ai-transcription",
      icon: HiOutlineMicrophone,
      title: "AI-Transcription",
      description: "Convert audio to text",
    },
    {
      path: "/video-downloader",
      icon: HiOutlineDownload,
      title: "Video Downloader",
      description: "Download videos easily",
    },
    {
      path: "/video-to-text",
      icon: HiOutlineVideoCamera,
      title: "Video to Text",
      description: "Extract text from videos",
    },
    {
      path: "/tools/yt-downloader",
      icon: IoLogoYoutube,
      title: "YouTube Video Downloader",
      description: "Download YouTube videos",
    },
    {
      path: "/audio-to-text",
      icon: HiOutlineMicrophone,
      title: "Audio to Text",
      description: "Transcribe audio files",
    },
    {
      path: "/transcribe-translation",
      icon: HiOutlineTranslate,
      title: "Transcribe & Translation",
      description: "Transcribe and translate content",
    },
    {
      path: "/youtube-transcript",
      icon: HiOutlineDocumentText,
      title: "YouTube Transcript Generator",
      description: "Generate YouTube transcripts",
    },
  ];

  return (
    <div
      ref={navDrawerRef}
      className={`fixed top-0 left-0 z-50 h-full w-80 transform bg-mint-800 shadow-xl transition-transform duration-300 md:hidden ${
        navDrawerOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-mint-700">
        <img
          src="/logo-dark.png"
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
              toggleNavDrawer();
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
              <span>Tools</span>
              <span>
                {mobileFeaturesOpen ? <GrFormSubtract /> : <IoMdAdd />}
              </span>
            </button>
            {mobileFeaturesOpen && (
              <div className="pl-6 mt-2 space-y-2 border-l border-mint-600 ml-4">
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className={`flex items-center py-2 transition-colors ${
                      isActiveLink(tool.path)
                        ? "text-mint-300"
                        : "text-mint-200 hover:text-mint-50"
                    }`}
                    onClick={() => {
                      toggleNavDrawer();
                      setMobileFeaturesOpen(false);
                    }}
                  >
                    <tool.icon className="w-4 h-4 mr-2" />
                    {tool.title}
                  </Link>
                ))}
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
              toggleNavDrawer();
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
              toggleNavDrawer();
              setMobileFeaturesOpen(false);
            }}
          >
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default MobileNav;
