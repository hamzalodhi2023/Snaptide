import React, { useState } from "react";
import { Link } from "react-router-dom";

function Tools() {
  const [activeCategory, setActiveCategory] = useState("All");

  const tools = [
    {
      id: 1,
      icon: "📥",
      title: "YT Downloader",
      description:
        "Paste the link & grab high-quality MP4 or MP3 files — fast, free & secure.",
      category: "Development",
      comingSoon: true,
    },
    {
      id: 2,
      icon: "⬇️",
      title: "FB Downloader",
      description:
        "Grab HD Facebook Videos Fast Just paste the link. No ads. No wait. 100% secure.",
      category: "Development",
      comingSoon: true,
    },
  ];

  const categories = ["All", "Development"];

  const filteredTools =
    activeCategory === "All"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  return (
    <section className="py-16 bg-mint-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-nunito text-mint-200 mb-4">
            Tools
          </h2>
          <p className="text-lg text-mint-100 max-w-2xl mx-auto">
            Access all the tools you need to boost your productivity and
            creativity
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors duration-200 font-medium ${
                activeCategory === category
                  ? "bg-mint-600 text-white"
                  : "bg-mint-800 text-mint-200 hover:bg-mint-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="group bg-mint-900 rounded-xl p-6 border border-mint-800 hover:border-mint-600 transition-all duration-300 hover:translate-y-1 hover:shadow-lg hover:shadow-mint-900/20 relative"
            >
              {/* Coming Soon Badge */}
              {tool.comingSoon && (
                <div className="absolute -top-2 -right-2 bg-mint-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  Coming Soon
                </div>
              )}

              {/* Icon and Category */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-mint-800 rounded-lg flex items-center justify-center group-hover:bg-mint-700 transition-colors duration-300">
                  <span className="text-2xl">{tool.icon}</span>
                </div>
                <span className="text-xs font-medium text-mint-400 bg-mint-800 px-2 py-1 rounded-full">
                  {tool.category}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold font-nunito text-mint-100 mb-3 group-hover:text-mint-200 transition-colors duration-200">
                {tool.title}
              </h3>
              <p className="text-mint-200 leading-relaxed mb-4">
                {tool.description}
              </p>

              {/* Action Button */}
              <button
                className={`w-full py-2 px-4 rounded-md transition-colors duration-200 group-hover:bg-mint-600 ${
                  tool.comingSoon
                    ? "bg-mint-800 text-mint-400 cursor-not-allowed"
                    : "bg-mint-800 hover:bg-mint-700 text-mint-200"
                }`}
                disabled={tool.comingSoon}
              >
                {tool.comingSoon ? "Coming Soon" : "Use Tool"}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Call to Action */}
        <div className="text-center mt-12">
          <Link
            to="/tools"
            className="bg-mint-600 hover:bg-mint-500 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 transform hover:scale-105"
          >
            Explore All Tools
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Tools;
