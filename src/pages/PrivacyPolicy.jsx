import React from "react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-mint-950 text-white font-inter py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-nunito text-mint-200 mb-4">
            Privacy Policy for SnapTideTools
          </h1>
          <p className="text-mint-100 text-lg">
            Last updated: 6 September 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-mint-900 rounded-xl p-8 border border-mint-800 shadow-lg">
          <div className="space-y-8">
            {/* Introduction */}
            <div>
              <p className="text-mint-200 leading-relaxed">
                Welcome to{" "}
                <span className="font-semibold text-mint-100">
                  SnapTideTools
                </span>{" "}
                ("we", "our", "us"). This Privacy Policy explains how we
                collect, use, and protect your information when you use our
                website and services.
              </p>
            </div>

            <div className="border-t border-mint-800 my-6"></div>

            {/* Section 1 */}
            <section className="border-l-4 border-mint-600 pl-6">
              <h2 className="text-2xl font-bold font-nunito text-mint-100 mb-4">
                📌 1. Information We Collect
              </h2>
              <p className="text-mint-200 mb-4">
                When you register on SnapTideTools, we may collect the following
                information:
              </p>
              <ul className="list-disc list-inside text-mint-200 space-y-2 ml-4">
                <li>First and last name</li>
                <li>Email address</li>
                <li>Password (securely hashed)</li>
                <li>Google ID or Facebook ID (for social login)</li>
                <li>Phone number (optional)</li>
                <li>Country, state, and city (optional)</li>
                <li>Avatar image (optional)</li>
                <li>Provider type (local, Google, or Facebook)</li>
                <li>Verification status</li>
              </ul>
              <p className="text-mint-200 mt-4">We also collect:</p>
              <ul className="list-disc list-inside text-mint-200 space-y-2 ml-4">
                <li>Anonymous usage data (e.g., tools used, pages visited)</li>
                <li>
                  Video URLs entered by users (temporarily, for processing only)
                </li>
                <li>
                  Browser information (e.g., device type, browser version)
                </li>
              </ul>
              <p className="text-mint-200 mt-4">
                We do{" "}
                <span className="font-semibold text-mint-100">
                  not store video content
                </span>{" "}
                or URLs after the download process completes.
              </p>
            </section>

            {/* Section 2 */}
            <section className="border-l-4 border-mint-600 pl-6">
              <h2 className="text-2xl font-bold font-nunito text-mint-100 mb-4">
                🔐 2. How We Use Your Information
              </h2>
              <p className="text-mint-200 mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside text-mint-200 space-y-2 ml-4">
                <li>Create and manage user accounts</li>
                <li>Provide secure login and authentication</li>
                <li>Offer personalized features (e.g., profile avatars)</li>
                <li>Analyze usage trends and optimize platform performance</li>
                <li>Ensure website security and prevent unauthorized access</li>
                <li>Contact you about account-related updates (if needed)</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="border-l-4 border-mint-600 pl-6">
              <h2 className="text-2xl font-bold font-nunito text-mint-100 mb-4">
                🍪 3. Cookies
              </h2>
              <p className="text-mint-200 mb-4">
                SnapTideTools may use cookies or similar technologies to:
              </p>
              <ul className="list-disc list-inside text-mint-200 space-y-2 ml-4">
                <li>Store user preferences</li>
                <li>Improve website functionality</li>
                <li>Analyze traffic and usage behavior</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="border-l-4 border-mint-600 pl-6">
              <h2 className="text-2xl font-bold font-nunito text-mint-100 mb-4">
                ❗ 4. Third-Party Services
              </h2>
              <p className="text-mint-200 mb-4">
                We do{" "}
                <span className="font-semibold text-mint-100">
                  not share your personal information
                </span>{" "}
                with third parties for marketing purposes.
              </p>
              <p className="text-mint-200">
                However, we may use trusted third-party services (e.g.,
                analytics providers or authentication tools like Google and
                Facebook) that collect or process data under their own privacy
                policies.
              </p>
            </section>

            {/* Section 5 */}
            <section className="border-l-4 border-mint-600 pl-6">
              <h2 className="text-2xl font-bold font-nunito text-mint-100 mb-4">
                🚸 5. Children's Privacy
              </h2>
              <p className="text-mint-200 mb-4">
                SnapTideTools does{" "}
                <span className="font-semibold text-mint-100">
                  not have any age restrictions
                </span>
                , but we do not knowingly collect information from children
                under the age of 13 without parental consent.
              </p>
              <p className="text-mint-200">
                If we learn that we have collected personal data from a child
                under 13 without verification of parental consent, we will take
                steps to remove that information.
              </p>
            </section>

            {/* Section 6 */}
            <section className="border-l-4 border-mint-600 pl-6">
              <h2 className="text-2xl font-bold font-nunito text-mint-100 mb-4">
                🛡️ 6. Data Security
              </h2>
              <p className="text-mint-200 mb-4">
                We use industry-standard encryption and security practices to
                protect your information.
              </p>
              <ul className="list-disc list-inside text-mint-200 space-y-2 ml-4">
                <li>Passwords are hashed using bcrypt before storage.</li>
                <li>Access to your data is restricted and protected.</li>
                <li>
                  However, no method of transmission over the internet is 100%
                  secure.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="border-l-4 border-mint-600 pl-6">
              <h2 className="text-2xl font-bold font-nunito text-mint-100 mb-4">
                📝 7. Changes to This Privacy Policy
              </h2>
              <p className="text-mint-200">
                We may update this Privacy Policy from time to time.
              </p>
            </section>

            {/* Section 8 */}
            <section className="border-l-4 border-mint-600 pl-6">
              <h2 className="text-2xl font-bold font-nunito text-mint-100 mb-4">
                📬 8. Contact Us
              </h2>
              <p className="text-mint-200 mb-4">
                If you have any questions about this Privacy Policy, feel free
                to contact us:
              </p>
              <div className="text-mint-200 space-y-2">
                <p className="flex items-center">
                  <span className="font-semibold mr-2">📧 Email:</span>
                  hamzalodhi2023@gmail.com
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">🌐 Website:</span>
                  https://snaptidetools.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
