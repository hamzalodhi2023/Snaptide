import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaCode,
  FaServer,
  FaMobile,
  FaEnvelope,
  FaFacebook,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-900 to-mint-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-nunito">
          Our Team
        </h1>
        <p className="text-xl text-mint-200 max-w-3xl mx-auto font-inter">
          We are a passionate developer duo creating innovative digital
          solutions with cutting-edge technologies.
        </p>
      </div>

      {/* Team Members Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Frontend Developer Card */}
        <div className="bg-mint-800 rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 border border-mint-600">
          <div className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full flex items-center justify-center mb-4 border-2 border-mint-500 overflow-hidden">
                {/* Replace with your actual image */}
                <img
                  src="/Hamza-Khan-Lodhi.png"
                  alt="Hamza Khan Lodhi"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback if image fails to load */}
                <div className="w-full h-full items-center justify-center bg-mint-600 hidden">
                  <FaUser className="text-white text-4xl" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white font-nunito">
                Hamza Khan Lodhi
              </h2>
              <div className="flex items-center mt-2">
                <FaCode className="text-mint-300 mr-2" />
                <span className="text-mint-200 font-inter">
                  Frontend Developer
                </span>
              </div>
            </div>
            <p className="text-mint-200 mb-6 text-center font-inter">
              Specializing in creating responsive, user-friendly interfaces with
              React, Tailwind CSS, and modern JavaScript frameworks.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/hamzalodhi2023"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mint-500 text-white p-3 rounded-full hover:bg-mint-400 transition-colors"
                title="GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="www.linkedin.com/in/hamzakhanlodhi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mint-500 text-white p-3 rounded-full hover:bg-mint-400 transition-colors"
                title="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://www.facebook.com/HamzaKhanLodhi2023"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mint-500 text-white p-3 rounded-full hover:bg-mint-400 transition-colors"
                title="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="mailto:hamzalodhi2023@gmail.com"
                className="bg-mint-500 text-white p-3 rounded-full hover:bg-mint-400 transition-colors"
                title="Email"
              >
                <FaEnvelope className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Backend Developer Card */}
        <div className="bg-mint-800 rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 border border-mint-600">
          <div className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full flex items-center justify-center mb-4 border-2 border-mint-500 overflow-hidden">
                {/* Replace with your actual image */}
                <img
                  src="/hafsa-khan-lodhi.png"
                  alt="Hafsa Khan Lodhi"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback if image fails to load */}
                <div className="w-full h-full items-center justify-center bg-mint-600 hidden">
                  <FaUser className="text-white text-4xl" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white font-nunito">
                Hafsa Khan Lodhi
              </h2>
              <div className="flex items-center mt-2">
                <FaServer className="text-mint-300 mr-2" />
                <span className="text-mint-200 font-inter">
                  Backend Developer
                </span>
              </div>
            </div>
            <p className="text-mint-200 mb-6 text-center font-inter">
              Expertise in building robust server-side applications, APIs, and
              database management with modern backend technologies.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/hafsalodhi2023"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mint-500 text-white p-3 rounded-full hover:bg-mint-400 transition-colors"
                title="GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="https://www.facebook.com/hafsalodhi2023"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mint-500 text-white p-3 rounded-full hover:bg-mint-400 transition-colors"
                title="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="mailto:hafsalodhi2023@gmail.com"
                className="bg-mint-500 text-white p-3 rounded-full hover:bg-mint-400 transition-colors"
                title="Email"
              >
                <FaEnvelope className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center text-white mb-12 font-nunito">
          Our Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-mint-800 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center border border-mint-600">
            <div className="bg-mint-600 p-4 rounded-full mb-4">
              <FaCode className="text-mint-300 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 font-nunito">
              Frontend Development
            </h3>
            <p className="text-mint-200 font-inter">
              React, JavaScript, HTML5, CSS3, Tailwind CSS, Responsive Design,
              UI/UX Implementation
            </p>
          </div>

          <div className="bg-mint-800 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center border border-mint-600">
            <div className="bg-mint-600 p-4 rounded-full mb-4">
              <FaServer className="text-mint-300 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 font-nunito">
              Backend Development
            </h3>
            <p className="text-mint-200 font-inter">
              Node.js, Express, RESTful APIs, Database Management,
              Authentication, Server Deployment
            </p>
          </div>

          <div className="bg-mint-800 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center border border-mint-600">
            <div className="bg-mint-600 p-4 rounded-full mb-4">
              <FaMobile className="text-mint-300 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 font-nunito">
              Full Stack Solutions
            </h3>
            <p className="text-mint-200 font-inter">
              End-to-end web application development, from concept to deployment
              and maintenance
            </p>
          </div>
        </div>
      </div>

      {/* Collaboration Section */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-mint-600 to-mint-700 rounded-2xl shadow-xl p-8 md:p-12 text-white border border-mint-500">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:mr-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-nunito">
              Let's Work Together
            </h2>
            <p className="opacity-90 font-inter">
              Have a project in mind? We'd love to hear about it and discuss how
              we can bring your ideas to life.
            </p>
          </div>
          <Link
            to="/contact"
            className="bg-white text-mint-700 font-semibold py-3
            px-8 rounded-full hover:bg-mint-100 transition-colors font-nunito"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
