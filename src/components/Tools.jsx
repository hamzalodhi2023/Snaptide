import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaFacebook,
  FaDownload,
  FaArrowRight,
  FaTools,
  FaStar,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

function Tools() {
  const [activeCategory, setActiveCategory] = useState("All");

  const tools = [
    {
      id: 1,
      icon: FaYoutube,
      title: "YouTube Downloader",
      description:
        "Download YouTube videos in HD quality. Support for MP4, MP3, and multiple resolutions.",
      category: "Video",
      comingSoon: false,
      features: ["1080p HD", "MP3 Support", "Fast Download"],
      color: "from-red-500 to-red-600",
    },
    {
      id: 2,
      icon: FaFacebook,
      title: "Facebook Downloader",
      description:
        "Download Facebook videos easily. High quality downloads with secure processing.",
      category: "Video",
      comingSoon: true,
      features: ["HD Quality", "Secure", "No Watermark"],
      color: "from-blue-600 to-blue-700",
    },
    {
      id: 3,
      icon: FaDownload,
      title: "Video Downloader",
      description:
        "Download videos from multiple platforms. Support for 1000+ websites.",
      category: "Video",
      comingSoon: true,
      features: ["Multi-Platform", "Batch Download", "All Formats"],
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      icon: FaTools,
      title: "Audio Converter",
      description:
        "Convert audio files between different formats with high quality preservation.",
      category: "Audio",
      comingSoon: true,
      features: ["MP3/WAV", "Quality Keep", "Fast Conversion"],
      color: "from-green-500 to-green-600",
    },
    {
      id: 5,
      icon: FaShieldAlt,
      title: "Password Generator",
      description:
        "Create strong and secure passwords for your online accounts.",
      category: "Security",
      comingSoon: true,
      features: ["Strong Passwords", "Customizable", "Secure"],
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 6,
      icon: FaClock,
      title: "Video Compressor",
      description:
        "Compress videos without losing quality. Reduce file size efficiently.",
      category: "Video",
      comingSoon: true,
      features: ["Quality Keep", "Size Reduce", "Fast Processing"],
      color: "from-teal-500 to-teal-600",
    },
  ];

  const categories = ["All", "Video", "Audio", "Security", "Utilities"];

  const filteredTools =
    activeCategory === "All"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  return (
    <section className="py-20 bg-gradient-to-br from-mint-950 via-mint-900 to-mint-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6">
            <FaTools className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-nunito text-white mb-4">
            Powerful Tools Suite
          </h2>
          <p className="text-xl text-mint-200 max-w-3xl mx-auto leading-relaxed">
            Discover our collection of professional tools designed to enhance
            your productivity and simplify your workflow
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-semibold border-2 ${
                activeCategory === category
                  ? "bg-mint-600 border-mint-500 text-white shadow-lg transform scale-105"
                  : "bg-mint-800 border-mint-700 text-mint-200 hover:bg-mint-700 hover:border-mint-600 hover:transform hover:scale-105"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="group relative bg-mint-800 rounded-2xl p-6 border-2 border-mint-700 hover:border-mint-500 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-mint-900/30"
            >
              {/* Coming Soon Badge */}
              {tool.comingSoon && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full z-10 shadow-lg">
                  <FaStar className="inline w-3 h-3 mr-1" />
                  Coming Soon
                </div>
              )}

              {/* Icon */}
              <div
                className={`bg-gradient-to-r ${tool.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <tool.icon className="w-8 h-8 text-white" />
              </div>

              {/* Category Badge */}
              <span className="inline-block text-xs font-semibold text-mint-300 bg-mint-700 px-3 py-1 rounded-full mb-4">
                {tool.category}
              </span>

              {/* Title and Description */}
              <h3 className="text-2xl font-bold font-nunito text-white mb-3 group-hover:text-mint-200 transition-colors">
                {tool.title}
              </h3>
              <p className="text-mint-200 leading-relaxed mb-6">
                {tool.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.features.map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-mint-700 text-mint-300 px-3 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  tool.comingSoon
                    ? "bg-mint-700 text-mint-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-mint-600 to-mint-500 hover:from-mint-500 hover:to-mint-400 text-white hover:shadow-lg hover:transform hover:scale-105"
                }`}
                disabled={tool.comingSoon}
              >
                {tool.comingSoon ? (
                  "Coming Soon"
                ) : (
                  <>
                    Use Tool
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* No Tools Message */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-mint-800 rounded-2xl p-8 border-2 border-mint-700 max-w-md mx-auto">
              <FaTools className="w-16 h-16 text-mint-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                No tools found
              </h3>
              <p className="text-mint-300">
                Try selecting a different category
              </p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-mint-800 to-mint-700 rounded-2xl p-8 border-2 border-mint-600 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to explore more?
            </h3>
            <p className="text-mint-200 mb-6">
              Discover our complete collection of tools designed to supercharge
              your productivity
            </p>
            <Link
              to="/tools"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <FaTools className="w-5 h-5" />
              Explore All Tools
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tools;
