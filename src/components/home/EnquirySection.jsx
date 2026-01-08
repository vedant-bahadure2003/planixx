import { useState } from "react";

const EnquirySection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    businessType: "",
    message: "",
  });

  const businessTypes = [
    "Event Venue",
    "Catering Service",
    "Photography/Videography",
    "Decoration & Florist",
    "Entertainment & Music",
    "Transportation",
    "Other Services",
  ];
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Email API endpoint
  const emailApiUrl = "https://vocoxp.staffhandler.com/vocoxp/tenant/tenant_backend/api/tenant/email";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Generate HTML email body
      const emailHtml = `
        <p>Dear Plannix Team,</p>
        <p>You have received a new business enquiry from your website. Please find the details below:</p>
        <h4>Enquiry Details:</h4>
        <ul>
            <li><strong>Name:</strong> ${formData.name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone || "N/A"}</li>
            <li><strong>Company/Business Name:</strong> ${formData.companyName}</li>
            <li><strong>Business Type:</strong> ${formData.businessType}</li>
        </ul>
        <h4>Message:</h4>
        <p>${formData.message || "No message provided."}</p>
        <p>Please respond to this enquiry at your earliest convenience.</p>
        <p><b>Plannix Website<br>Automated Enquiry System</b></p>
      `;

      // Send email via API
      const response = await fetch(emailApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "contact@plannix.in",
          subject: `New Business Enquiry from ${formData.name} - ${formData.businessType}`,
          html: emailHtml,
          from: '"Plannix Website" <transactions@staffhandler.com>',
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          companyName: "",
          businessType: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Email API Error:", error);
      setIsSubmitting(false);
      setSubmitError("Failed to send enquiry. Please try again.");
    }
  };

  return (
    <section
      id="enquiry"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Decorative floating elements */}
        <div
          className="absolute top-32 right-20 w-3 h-3 bg-green-400 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
          style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/2 right-32 w-4 h-4 bg-green-500/50 rounded-full animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">
              Let's Plan Together
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 ">
            Ready to Create
            <span className="block mt-2 pb-2 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
              Magic?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tell us about your dream event and let our expert planners bring
            your vision to life. We're here to make every moment unforgettable.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left side - Info cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick stats card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold text-lg mb-4">
                  Why Choose plannix?
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: "🎯",
                      title: "Expert Planning",
                      desc: "10+ years of experience",
                    },
                    {
                      icon: "⚡",
                      title: "Quick Response",
                      desc: "Within 24 hours",
                    },
                    {
                      icon: "💎",
                      title: "Premium Service",
                      desc: "Tailored to your needs",
                    },
                    {
                      icon: "🤝",
                      title: "Dedicated Support",
                      desc: "From start to finish",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 group/item"
                    >
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-lg group-hover/item:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">
                          {item.title}
                        </h4>
                        <p className="text-gray-500 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold text-lg mb-4">
                  Prefer to Talk?
                </h3>
                <div className="space-y-3">
                
                  <a
                    href="mailto:contact@plannix.in"
                    className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors group/link"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover/link:bg-green-500/20 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm">contact@plannix.in</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="lg:col-span-3">
            <div className="relative">
              {/* Form glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-3xl blur-lg opacity-20" />

              <form
                onSubmit={handleSubmit}
                className="relative bg-gray-800/60 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl"
              >
                {/* Success overlay */}
                {isSubmitted && (
                  <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Thank You!
                      </h3>
                      <p className="text-gray-400">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {/* Event type selector */}

                {/* Form fields grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Name field */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === "name" || formData.name
                          ? "-top-2.5 text-xs text-green-400 bg-gray-800 px-2"
                          : "top-4 text-gray-500 text-sm"
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === "email" || formData.email
                          ? "-top-2.5 text-xs text-green-400 bg-gray-800 px-2"
                          : "top-4 text-gray-500 text-sm"
                      }`}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Phone field */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === "phone" || formData.phone
                          ? "-top-2.5 text-xs text-green-400 bg-gray-800 px-2"
                          : "top-4 text-gray-500 text-sm"
                      }`}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                    />
                  </div>

                  {/* Company Name field */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === "companyName" || formData.companyName
                          ? "-top-2.5 text-xs text-green-400 bg-gray-800 px-2"
                          : "top-4 text-gray-500 text-sm"
                      }`}
                    >
                      Company/Business Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("companyName")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Business Type field */}
                <div className="relative mb-6">
                  <label className="block text-gray-400 text-sm mb-2">
                    Business Type
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled className="bg-gray-900">
                      Select your business type
                    </option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type} className="bg-gray-900">
                        {type}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-4 top-[42px] pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Message field */}
                <div className="mb-8">
                  <label className="block text-gray-400 text-sm mb-2">
                    Tell us about your vision
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe your dream event - the theme, special requirements, or any ideas you have in mind..."
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full py-4 px-8 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 disabled:opacity-70"
                >
                  {/* Button background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 transition-transform duration-500 group-hover:scale-105" />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {/* Button content */}
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="w-5 h-5 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Start Planning My Event</span>
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
                      </>
                    )}
                  </span>

                  {/* Button shadow */}
                  <div className="absolute inset-0 rounded-xl shadow-lg shadow-green-500/30 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-shadow duration-300" />
                </button>

                {/* Privacy note */}
                <p className="mt-4 text-center text-gray-500 text-xs">
                  By submitting, you agree to our{" "}
                  <a
                    href="#privacy"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="#terms"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    Terms of Service
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquirySection;
