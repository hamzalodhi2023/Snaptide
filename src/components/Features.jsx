import React from "react";

function Features() {
  const features = [
    {
      id: 1,
      icon: "🚀",
      title: "Fast Performance",
      description:
        "Lightning fast loading times and smooth interactions for optimal user experience.",
    },
    {
      id: 2,
      icon: "🎨",
      title: "Modern Design",
      description:
        "Clean, modern interface with intuitive navigation and beautiful visual elements.",
    },
    {
      id: 3,
      icon: "🔒",
      title: "Secure & Safe",
      description:
        "Advanced security measures to protect your data and ensure privacy.",
    },
    {
      id: 4,
      icon: "📱",
      title: "Fully Responsive",
      description:
        "Perfect experience across all devices - desktop, tablet, and mobile.",
    },
    {
      id: 5,
      icon: "⚡",
      title: "Easy to Use",
      description:
        "Intuitive interface that makes it easy for anyone to get started quickly.",
    },
    {
      id: 6,
      icon: "🔄",
      title: "Regular Updates",
      description: "Continuous improvements and new features added regularly.",
    },
  ];

  return (
    <section className="py-16 bg-mint-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-nunito text-mint-200 mb-4">
            Amazing Features
          </h2>
          <p className="text-lg text-mint-100 max-w-2xl mx-auto">
            Discover the powerful features that make our platform stand out from
            the rest
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group bg-mint-900 rounded-xl p-6 border border-mint-800 hover:border-mint-600 transition-all duration-300 hover:translate-y-2 hover:shadow-lg hover:shadow-mint-900/20 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-mint-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-mint-700 transition-colors duration-300">
                <span className="text-3xl">{feature.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold font-nunito text-mint-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-mint-200 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Line */}
              <div className="w-0 h-0.5 bg-mint-400 mt-4 group-hover:w-12 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
