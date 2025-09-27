import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaMicrophone,
  FaDownload,
  FaVideo,
  FaYoutube,
  FaFileAudio,
  FaLanguage,
  FaFileAlt,
  FaCogs,
  FaPalette,
  FaCode,
  FaImage,
  FaMusic,
  FaFilm,
  FaCloudDownloadAlt,
  FaTransgender,
  FaCompressAlt,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";

function Tools() {
  const [searchTerm, setSearchTerm] = useState("");

  const tools = [
    {
      id: 1,
      name: "AI Transcription",
      description: "Convert audio files to text with advanced AI technology",
      icon: FaMicrophone,
      path: "/ai-transcription",
      category: "Audio",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Video Downloader",
      description: "Download videos from various platforms in high quality",
      icon: FaDownload,
      path: "/video-downloader",
      category: "Video",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "Video to Text",
      description: "Extract text and subtitles from video files",
      icon: FaVideo,
      path: "/video-to-text",
      category: "Video",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      name: "YouTube Downloader",
      description: "Download YouTube videos and playlists easily",
      icon: FaYoutube,
      path: "/youtube-downloader",
      category: "Video",
      color: "from-red-500 to-red-600",
    },
    {
      id: 5,
      name: "Audio to Text",
      description: "Transcribe audio files to text with high accuracy",
      icon: FaFileAudio,
      path: "/audio-to-text",
      category: "Audio",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 6,
      name: "Transcribe & Translation",
      description: "Transcribe and translate content simultaneously",
      icon: FaLanguage,
      path: "/transcribe-translation",
      category: "Text",
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: 7,
      name: "YouTube Transcript",
      description: "Generate transcripts from YouTube videos automatically",
      icon: FaFileAlt,
      path: "/youtube-transcript",
      category: "Text",
      color: "from-rose-500 to-pink-500",
    },
    {
      id: 8,
      name: "Image Converter",
      description: "Convert images between different formats",
      icon: FaImage,
      path: "/image-converter",
      category: "Media",
      color: "from-amber-500 to-yellow-500",
    },
    {
      id: 9,
      name: "Audio Converter",
      description: "Convert audio files to various formats",
      icon: FaMusic,
      path: "/audio-converter",
      category: "Audio",
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: 10,
      name: "Video Converter",
      description: "Convert videos to different formats and resolutions",
      icon: FaFilm,
      path: "/video-converter",
      category: "Video",
      color: "from-violet-500 to-purple-500",
    },
    {
      id: 11,
      name: "File Compressor",
      description: "Compress files and reduce their size",
      icon: FaCompressAlt,
      path: "/file-compressor",
      category: "Utilities",
      color: "from-slate-600 to-gray-600",
    },
    {
      id: 12,
      name: "Password Generator",
      description: "Create strong and secure passwords",
      icon: FaLock,
      path: "/password-generator",
      category: "Security",
      color: "from-lime-500 to-green-500",
    },
  ];

  const categories = [
    "All",
    "Video",
    "Audio",
    "Text",
    "Media",
    "Utilities",
    "Security",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-900 to-mint-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
              <FaCogs className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-nunito font-bold text-white mb-4">
            Powerful Tools Collection
          </h1>
          <p className="text-xl text-mint-200 max-w-3xl mx-auto">
            Discover our comprehensive suite of tools for audio, video, text
            processing, and more. Everything you need in one place.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-mint-800 rounded-2xl p-6 mb-8 border border-mint-700 shadow-xl">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-mint-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tools by name or description..."
              className="block w-full pl-10 pr-4 py-4 bg-mint-700 border border-mint-600 rounded-xl text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white shadow-lg transform scale-105"
                    : "bg-mint-700 text-mint-200 hover:bg-mint-600 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.path}
              className="group bg-mint-800 rounded-2xl p-6 border border-mint-700 hover:border-mint-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Icon with Gradient Background */}
              <div
                className={`bg-gradient-to-r ${tool.color} p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <tool.icon className="w-8 h-8 text-white" />
              </div>

              {/* Tool Info */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {tool.name}
              </h3>
              <p className="text-mint-300 text-sm mb-4 line-clamp-2">
                {tool.description}
              </p>

              {/* Category Badge */}
              <div className="flex justify-between items-center">
                <span className="inline-block bg-mint-700 text-mint-300 text-xs px-3 py-1 rounded-full">
                  {tool.category}
                </span>
                <div className="text-mint-400 group-hover:text-white transition-colors">
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-mint-800 rounded-2xl p-8 border border-mint-700">
              <FaSearch className="w-16 h-16 text-mint-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                No tools found
              </h3>
              <p className="text-mint-300">
                Try adjusting your search terms or select a different category.
              </p>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-mint-800 rounded-2xl p-8 border border-mint-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">
                {tools.length}+
              </div>
              <div className="text-mint-300">Total Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">6</div>
              <div className="text-mint-300">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-mint-300">Free to Use</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-mint-300">Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tools;
