import { useState } from "react";
import BusinessEnquiryModal from "../common/BusinessEnquiryModal";

const privacySections = [
  {
    id: "collection",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "When you create an account or make enquiries, we collect your name, email address, phone number, and event details. This helps us provide personalized event planning services.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with our platform, including pages visited, features used, and time spent on our services.",
      },
      {
        subtitle: "Device Information",
        text: "We may collect device-specific information such as your device type, operating system, browser type, and IP address to optimize your experience.",
      },
    ],
  },
  {
    id: "usage",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Service Delivery",
        text: "We use your information to provide, maintain, and improve our event planning services, process your enquiries, and communicate about your events.",
      },
      {
        subtitle: "Personalization",
        text: "Your data helps us personalize recommendations, suggest relevant vendors, and tailor our platform to your preferences and event needs.",
      },
      {
        subtitle: "Communication",
        text: "We may send you updates about your events, promotional offers, and important service announcements. You can opt-out of marketing communications anytime.",
      },
    ],
  },
  {
    id: "sharing",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
    ),
    title: "Information Sharing",
    content: [
      {
        subtitle: "With Vendors",
        text: "We share relevant event details with vendors you select to fulfill your event requirements. Vendors are bound by confidentiality agreements.",
      },
      {
        subtitle: "Service Providers",
        text: "We work with trusted third-party services for payment processing, analytics, and communication. They only access data necessary for their functions.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose information when required by law, to protect our rights, prevent fraud, or ensure the safety of our users and the public.",
      },
    ],
  },
  {
    id: "security",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "Data Security",
    content: [
      {
        subtitle: "Encryption",
        text: "All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols to prevent unauthorized access.",
      },
      {
        subtitle: "Access Controls",
        text: "We implement strict access controls ensuring only authorized personnel can access your data, and only when necessary for service delivery.",
      },
      {
        subtitle: "Regular Audits",
        text: "Our security practices are regularly reviewed and updated to address emerging threats and maintain the highest standards of data protection.",
      },
    ],
  },
  {
    id: "rights",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & Portability",
        text: "You have the right to access your personal data and request a copy in a portable format. Contact us to receive your data within 30 days.",
      },
      {
        subtitle: "Correction & Deletion",
        text: "You can update your information through your account settings or request deletion of your data, subject to legal retention requirements.",
      },
      {
        subtitle: "Consent Withdrawal",
        text: "You may withdraw consent for data processing at any time. This won't affect the lawfulness of processing based on consent before withdrawal.",
      },
    ],
  },
  {
    id: "cookies",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Cookies & Tracking",
    content: [
      {
        subtitle: "Essential Cookies",
        text: "Required for basic site functionality, authentication, and security. These cannot be disabled as they're necessary for the service to work.",
      },
      {
        subtitle: "Analytics Cookies",
        text: "Help us understand how visitors interact with our platform, allowing us to improve user experience and service quality.",
      },
      {
        subtitle: "Marketing Cookies",
        text: "Used to deliver relevant advertisements and measure campaign effectiveness. You can manage these preferences in your browser settings.",
      },
    ],
  },
];

const DataPolicy = () => {
  const [activeSection, setActiveSection] = useState("collection");
  const [expandedItems, setExpandedItems] = useState({});
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const toggleItem = (sectionId, index) => {
    const key = `${sectionId}-${index}`;
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeContent = privacySections.find((s) => s.id === activeSection);

  return (
    <section
      id="privacy"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />

        {/* Animated lines */}
        <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* Floating shield icon */}
        <div className="absolute top-40 right-20 opacity-5">
          <svg
            className="w-64 h-64 text-green-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <svg
              className="w-4 h-4 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-green-400 text-sm font-medium">
              Your Privacy Matters
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Privacy
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
              {" "}
              Policy
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            We believe in complete transparency. Learn how we collect, use, and
            protect your personal information to deliver exceptional event
            planning experiences.
          </p>
          <p className="text-gray-500 text-sm">Last updated: January 1, 2026</p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Navigation sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-b from-green-500/20 to-emerald-500/20 rounded-2xl blur opacity-50" />
                <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                  <h3 className="text-white font-semibold text-sm mb-4 px-2">
                    Quick Navigation
                  </h3>
                  <nav className="space-y-1">
                    {privacySections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                          activeSection === section.id
                            ? "bg-green-500/20 text-green-400 shadow-lg shadow-green-500/10"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            activeSection === section.id
                              ? "bg-green-500/20 text-green-400"
                              : "bg-white/5 text-gray-500 group-hover:text-gray-300"
                          }`}
                        >
                          {section.icon}
                        </div>
                        <span className="text-sm font-medium">
                          {section.title}
                        </span>
                        {activeSection === section.id && (
                          <div className="ml-auto w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        )}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Quick contact card */}
              <div className="mt-6 relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold text-sm">
                      Questions?
                    </h4>
                  </div>
                  <p className="text-gray-400 text-xs mb-4">
                    Contact our privacy team for any concerns about your data.
                  </p>
                  <button
                    onClick={() => setIsEnquiryModalOpen(true)}
                    className="inline-flex items-center gap-2 text-green-400 text-sm font-medium hover:text-green-300 transition-colors"
                  >
                   contact@plannix.in
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="lg:col-span-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 rounded-3xl blur-lg" />
              <div className="relative bg-gray-800/40 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/10">
                {/* Section header */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-green-400">
                    {activeContent?.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {activeContent?.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Section{" "}
                      {privacySections.findIndex(
                        (s) => s.id === activeSection
                      ) + 1}{" "}
                      of {privacySections.length}
                    </p>
                  </div>
                </div>

                {/* Content items */}
                <div className="space-y-4">
                  {activeContent?.content.map((item, index) => {
                    const isExpanded =
                      expandedItems[`${activeSection}-${index}`] !== false;
                    return (
                      <div key={index} className="group">
                        <button
                          onClick={() => toggleItem(activeSection, index)}
                          className="w-full"
                        >
                          <div
                            className={`p-5 rounded-2xl border transition-all duration-300 ${
                              isExpanded
                                ? "bg-white/5 border-green-500/30"
                                : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/5"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                    isExpanded
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-white/5 text-gray-500"
                                  }`}
                                >
                                  {index + 1}
                                </div>
                                <h4
                                  className={`font-semibold transition-colors duration-300 ${
                                    isExpanded ? "text-white" : "text-gray-300"
                                  }`}
                                >
                                  {item.subtitle}
                                </h4>
                              </div>
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                  isExpanded
                                    ? "bg-green-500/20 text-green-400 rotate-180"
                                    : "bg-white/5 text-gray-500"
                                }`}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </div>

                            <div
                              className={`overflow-hidden transition-all duration-300 ${
                                isExpanded
                                  ? "max-h-40 mt-4 opacity-100"
                                  : "max-h-0 opacity-0"
                              }`}
                            >
                              <p className="text-gray-400 text-sm leading-relaxed pl-11">
                                {item.text}
                              </p>
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      const currentIndex = privacySections.findIndex(
                        (s) => s.id === activeSection
                      );
                      if (currentIndex > 0) {
                        setActiveSection(privacySections[currentIndex - 1].id);
                      }
                    }}
                    disabled={
                      privacySections.findIndex(
                        (s) => s.id === activeSection
                      ) === 0
                    }
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-gray-400 hover:text-white hover:bg-white/5"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </button>

                  <div className="flex gap-1.5">
                    {privacySections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          activeSection === section.id
                            ? "w-6 bg-green-500"
                            : "bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      const currentIndex = privacySections.findIndex(
                        (s) => s.id === activeSection
                      );
                      if (currentIndex < privacySections.length - 1) {
                        setActiveSection(privacySections[currentIndex + 1].id);
                      }
                    }}
                    disabled={
                      privacySections.findIndex(
                        (s) => s.id === activeSection
                      ) ===
                      privacySections.length - 1
                    }
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-gray-400 hover:text-white hover:bg-white/5"
                  >
                    Next
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom info cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Data retention card */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
                <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Data Retention</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We retain your personal data only as long as necessary to
                    provide our services or as required by law. Inactive
                    accounts are automatically purged after 24 months.
                  </p>
                </div>
              </div>

              {/* Updates card */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
                <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Policy Updates</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We may update this policy periodically. Significant changes
                    will be notified via email or prominent notice on our
                    platform at least 30 days before taking effect.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Business Enquiry Modal */}
      <BusinessEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </section>
  );
};

export default DataPolicy;
