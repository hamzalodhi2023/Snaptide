import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white font-in">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <img
            src="/logo-dark.png"
            alt="Snaptide Logo"
            className="w-32 h-auto mb-2"
          />
          <p className="text-sm text-gray-300">
            Snap instantly. Ride the tide of downloads.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-lg mb-3 text-white">Quick Links</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/features">Features</a>
            </li>
            <li>
              <a href="/docs">Documentation</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="font-semibold text-lg mb-3 text-white">Legal</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Powered By */}
        <div>
          <h2 className="font-semibold text-lg mb-3 text-white">Powered By</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a
                href="https://github.com/hamzalodhi2023"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition duration-300"
              >
                Hamza Khan Lodhi – Frontend Developer
              </a>
            </li>
            <li>
              <a
                href="https://github.com/hafsalodhi2023"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition duration-300"
              >
                Hafsa Khan Lodhi – Backend Developer
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-700 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Snaptide. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
