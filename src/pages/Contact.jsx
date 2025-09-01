import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaLinkedin,
  FaGithub,
  FaFacebook,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-900 to-mint-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-nunito">
            Get In Touch
          </h1>
          <p className="text-xl text-mint-200 max-w-3xl mx-auto font-inter">
            Have a project in mind or want to discuss potential collaboration?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-mint-800 rounded-2xl p-8 border border-mint-700">
              <h2 className="text-2xl font-bold text-white mb-6 font-nunito">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-mint-700 p-3 rounded-lg mr-4">
                    <FaPhone className="text-mint-300 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Phone
                    </h3>
                    <p className="text-mint-200">+92 327 3622257</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-mint-700 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-mint-300 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Frontend Developer Email
                    </h3>
                    <p className="text-mint-200">hamzalodhi2023@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-mint-700 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-mint-300 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Backend Developer Email
                    </h3>
                    <p className="text-mint-200">hafsalodhi2023@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-mint-700 p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-mint-300 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Location
                    </h3>
                    <p className="text-mint-200">Karachi, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Team Social Links */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4 font-nunito">
                  Connect With Us
                </h3>

                {/* Hamza Khan Lodhi */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-mint-300 mb-2">
                    Hamza Khan Lodhi
                  </h4>
                  <div className="flex space-x-3">
                    <a
                      href="https://github.com/hamzalodhi2023"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-mint-700 text-mint-300 p-2 rounded-lg hover:bg-mint-600 transition-colors"
                      title="GitHub"
                    >
                      <FaGithub className="text-lg" />
                    </a>
                    <a
                      href="https://linkedin.com/in/hamzakhanlodhi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-mint-700 text-mint-300 p-2 rounded-lg hover:bg-mint-600 transition-colors"
                      title="LinkedIn"
                    >
                      <FaLinkedin className="text-lg" />
                    </a>
                    <a
                      href="https://www.facebook.com/HamzaKhanLodhi2023"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-mint-700 text-mint-300 p-2 rounded-lg hover:bg-mint-600 transition-colors"
                      title="Facebook"
                    >
                      <FaFacebook className="text-lg" />
                    </a>
                  </div>
                </div>

                {/* Hafsa Khan Lodhi */}
                <div>
                  <h4 className="text-md font-semibold text-mint-300 mb-2">
                    Hafsa Khan Lodhi
                  </h4>
                  <div className="flex space-x-3">
                    <a
                      href="https://github.com/hafsalodhi2023"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-mint-700 text-mint-300 p-2 rounded-lg hover:bg-mint-600 transition-colors"
                      title="GitHub"
                    >
                      <FaGithub className="text-lg" />
                    </a>
                    <a
                      href="https://www.facebook.com/hafsalodhi2023"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-mint-700 text-mint-300 p-2 rounded-lg hover:bg-mint-600 transition-colors"
                      title="Facebook"
                    >
                      <FaFacebook className="text-lg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-mint-800 rounded-2xl p-6 border border-mint-700">
              <h2 className="text-2xl font-bold text-white mb-6 font-nunito">
                Our Location
              </h2>
              <div className="rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4227.2080075069725!2d66.8979751!3d24.8883686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3132f9e5d46a5%3A0xe7ba23352648d8ce!2sMusharraf%20colony%20hawkes%20bay%20Town%2C%20Karachi!5e1!3m2!1sen!2s!4v1756715491501!5m2!1sen!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title="Our Location Map"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-mint-800 rounded-2xl p-8 border border-mint-700">
            <h2 className="text-2xl font-bold text-white mb-6 font-nunito">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-mint-100 mb-2 font-inter"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-mint-700 border border-mint-600 rounded-lg px-4 py-3 text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-mint-100 mb-2 font-inter"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-mint-700 border border-mint-600 rounded-lg px-4 py-3 text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-mint-100 mb-2 font-inter"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-mint-700 border border-mint-600 rounded-lg px-4 py-3 text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400"
                  placeholder="Enter subject"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-mint-100 mb-2 font-inter"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-mint-700 border border-mint-600 rounded-lg px-4 py-3 text-white placeholder-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-mint-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-mint-500 transition-colors flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-mint-700 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2 font-nunito">
                Response Time
              </h3>
              <p className="text-mint-200">
                We typically respond to all inquiries within 24 hours during
                business days. For urgent matters, please call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
